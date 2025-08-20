<?php

namespace App\Http\Controllers\Oficios;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Variables;
use App\Models\User;
use App\Models\Catalogos\DestinatarioExterno;
use App\Models\Oficios\Nuevo;
use App\Models\Oficios\Copia;
use App\Models\Oficios\ArchivoOficio;
use App\Models\Directorio\Directorio;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Mail\Oficios\JefeNuevo;
use App\Mail\Oficios\ColaboradorNuevo;
use App\Mail\Oficios\AceptaRespuestaJefe;
use App\Mail\Oficios\Enviado;
use App\Mail\Oficios\RechazoRespuestaJefe;
use App\Mail\Oficios\RechazoRespuestaFinal;
use Illuminate\Support\Facades\Mail;
use App\Models\Oficios\DestinatarioOficio;
use DB;

class NuevoController extends Controller
{
    public function index($id){
		$oficio  = Nuevo::find($id);

		$directorio = Directorio::select('id as value','nombre as label')->whereNotIn('id', function ($query) use ($id) {
        	$query->select('id_directorio')->from('oficios_copias')->where('id_nuevo_oficio', $id)->whereNotNull('id_directorio');
    	})->orderBy('nombre')->get();

		$copy = Copia::select('id','id_nuevo_oficio','id_directorio','nombre','cargo','dependencia')->where('id_nuevo_oficio', $id)->get();
		
		$archivos = ArchivoOficio::where('id_nuevo_oficio', $id)
		->get()
		->map(function($archivo) {
			$extension = pathinfo($archivo->archivo, PATHINFO_EXTENSION);
			
			if($extension == "pdf" || $extension == "jpg" || $extension == "jpeg" || $extension == "png"){
				$url = $archivo->archivo;
			}else{
				$url = asset("files/".$archivo->archivo);
			}


            return [
				'serverId' => $archivo->id,
				'origin' => 1,
                'source' => $archivo->id,
				'file' => $archivo->archivo,
                'options' => [
                    'type' => 'local',
                    'file' => [
                        'name' => $archivo->nombre,
                        'size' => \Storage::disk('files')->exists($archivo->archivo) ? \Storage::disk('files')->size($archivo->archivo) : 0,
                        'type' => mime_content_type(\Storage::disk('files')->path($archivo->archivo)),
                    ],
                    'metadata' => [
                        'url' => $url,
						'extension' => $extension,
                    ],
                ],
            ];
        });
		

		$externos = DestinatarioExterno::select('id as value','nombre as label')->whereNotIn('id', function ($query) use ($id) {
        	$query->select('id_usuario')->from('destinatarios_oficio')->where('id_oficio', $id)->where('tipo_usuario', 2)->get();
    	})->orderBy('nombre')->get();

		$directorioAll = Directorio::select('id as value','nombre as label')->whereNotIn('id', function ($query) use ($id) {
        	$query->select('id_usuario')->from('destinatarios_oficio')->where('id_oficio', $id)->where('tipo_usuario', 1);
    	})->orderBy('nombre')->get();


		$destinatarios = DestinatarioOficio::select(
			'destinatarios_oficio.id',
			DB::raw("COALESCE(directorios.nombre, cat_destinatarios_externos.nombre) as nombre"),
			DB::raw("COALESCE(directorios.cargo, cat_destinatarios_externos.cargo) as cargo"),
			DB::raw("COALESCE(directorios.dependencia, cat_destinatarios_externos.dependencia) as dependencia"),
			'destinatarios_oficio.tipo_usuario',
			'destinatarios_oficio.id_usuario'
		)
		->leftJoin('directorios', function($join)
		{
			$join->on('destinatarios_oficio.tipo_usuario', '=', DB::raw("1"));
			$join->on('destinatarios_oficio.id_usuario', '=', 'directorios.id');

		})
		->leftJoin('cat_destinatarios_externos', function($join)
		{
			$join->on('destinatarios_oficio.tipo_usuario', '=', DB::raw("2"));
			$join->on('destinatarios_oficio.id_usuario', '=', 'cat_destinatarios_externos.id');

		})
		->where('destinatarios_oficio.id_oficio', $id)
		->orderBy('destinatarios_oficio.id', 'desc')
		->get();

		return Inertia::render('Oficios/Nuevo', ['status' => session('status'), 'error' => session('error'), 'destinatariosOficio' => $destinatarios, 'externos' => $externos, 'oficio' => $oficio,'files' => $archivos, 'directorio' => $directorio, 'copy' => $copy, 'directorioAll' => $directorioAll]);
	}

    public function exportapdf($id, $id_usuario, $tipo_usuario)
	{

		$fechaENvio = Nuevo::find($id);

		if($fechaENvio->fecha_envio){
			$fecha = $fechaENvio->fecha_envio;
		}else{
			$fecha = date('Y-m-d');
		}
		
		// Obtener la fecha actual en español, ejemplo: 04 de julio de 2025
		setlocale(LC_TIME, 'es_ES.UTF-8', 'Spanish_Spain.1252');
		$fechaEscrita = strftime('%d de %B de %Y', strtotime($fecha));
		// En caso de que strftime no funcione correctamente en Windows, usar una alternativa:
		if (strpos($fechaEscrita, '%') !== false) {
			$meses = [
				1 => 'enero', 2 => 'febrero', 3 => 'marzo', 4 => 'abril',
				5 => 'mayo', 6 => 'junio', 7 => 'julio', 8 => 'agosto',
				9 => 'septiembre', 10 => 'octubre', 11 => 'noviembre', 12 => 'diciembre'
			];
			$dia = date('d');
			$mes = $meses[intval(date('m'))];
			$anio = date('Y');
			$fechaEscrita = "$dia de $mes de $anio";
		}

		$copias = Copia::where('id_nuevo_oficio', $id)->get();
		
		$oficio = Nuevo::select(
            'nuevos_oficios.iniciales_area as area',
            'nuevos_oficios.iniciales_proceso as proceso',
			'cat_areas.siglas',
		)

		->join('cat_areas', 'cat_areas.id', 'nuevos_oficios.id_area')
		->where('nuevos_oficios.id', $id)
		->first();


		$tabla = $tipo_usuario == 1 ? 'directorios' : 'cat_destinatarios_externos';

        $respuesta = Nuevo::select(
            'nuevos_oficios.oficio_respuesta',
            "$tabla.nombre",
			"$tabla.cargo",
			"$tabla.dependencia",
            'nuevos_oficios.respuesta',
			'destinatarios_oficio.folio'
		)
		->leftJoin($tabla, function($join) use ($id_usuario, $tabla)
		{
			$join->on("$tabla.id",'=', DB::raw("$id_usuario"));

		})
		->join('destinatarios_oficio', function($join) use ($id_usuario, $tipo_usuario, $id)
		{
			$join->on("destinatarios_oficio.tipo_usuario",'=', DB::raw("$tipo_usuario"));
			$join->on("destinatarios_oficio.id_usuario",'=', DB::raw("$id_usuario"));
			$join->on("destinatarios_oficio.id_oficio",'=', DB::raw("$id"));

		})
		->where('nuevos_oficios.id', $id)
		->first();

		if($respuesta?->oficio_respuesta === null){
			$respuesta->oficio_respuesta = $respuesta?->folio;
		}
        

		$pdf = Pdf::loadView('Oficios.Vice', [
			'copias' => $copias,
			'oficio' => $oficio,
            'respuesta' => $respuesta,
			'fechaEscrita' => $fechaEscrita
		]);

	
			return $pdf->stream('respuesta_oficio.pdf');
		
	}

    public function saveNuevo(Request $request){
		$request->validate([
			'asunto' => 'nullable|min:2'
		]);

		
		$bandera = Nuevo::find($request->id_oficio);
		if(empty($bandera)){
			$respuesta = new Nuevo();
            $respuesta->id_area = \Auth::user()->id_area;
			
		}else{
			$respuesta = Nuevo::find($bandera->id);	
		}

        $jefe = User::select('iniciales')->where('rol',3)->where('id_area', \Auth::user()->id_area)->first();

		

		$respuesta->respuesta = $request->asunto;
		$respuesta->comentario = $request->comentario;
        $respuesta->iniciales_area = $jefe->iniciales;

		if(\Auth::user()->rol == 5){
			if(empty($bandera) || $respuesta->id_usuario == \Auth::user()->id){
				$respuesta->id_usuario = \Auth::user()->rol == 4 ? \Auth::user()->id : null;
				$respuesta->iniciales_proceso = \Auth::user()->rol == 4 ? \Auth::user()->iniciales : null;
			}
		}else if(\Auth::user()->rol == 3){
			if($respuesta->id_usuario == null){
				$respuesta->revision = 1;
			}
		}else if(\Auth::user()->rol == 4){
			$respuesta->id_usuario = \Auth::user()->rol == 4 ? \Auth::user()->id : null;
			$respuesta->iniciales_proceso =  \Auth::user()->rol == 4 ? \Auth::user()->iniciales : null;	
		}
		$respuesta->save();




		if(empty($bandera)){
			return redirect()->route('nuevoOficio',['id' => $respuesta->id])->with('status', "Se guardo el nuevo oficio.");
		} else {
			return back()->with('status', "Se guardo la respuesta del oficio.");
		}
		
	}

	public function actualizaFecha(Request $request){
		$request->validate([
			'fecha' => 'required|date'
		]);

		$oficio = Nuevo::find($request->id);
		if (!$oficio) {
			return response()->json(['error' => 'Oficio no encontrado'], 404);
		}

		$oficio->fecha_envio = $request->fecha;
		$oficio->save();

		return back()->with('status', "Se actualizo la fecha de respuesta del oficio.");
	}


    public function uploadFiles(Request $request, $id){
    	ini_set('upload_max_filesize', '30M');
    	ini_set('post_max_size', '30M');

		if (!$request->expectsJson()) {
			$request->headers->set('Accept', 'application/json');
		}
	
		$request->validate([
            'file' => 'required|file|max:25600|mimes:pdf,doc,docx,jpg,png,xlsx,xls,csv,txt, pptx, xml, zip, rar',
        ]);

        if ($request->hasFile('file')) {
            $file = $request->file('file');

			$archivo = 'adjuntos_oficios/'.time()."_".\Auth::user()->id."_".$request->file->getClientOriginalName();
    	    $path = \Storage::disk('files')->put($archivo, \File::get($request->file));

			$archivoOficio = new ArchivoOficio();
			$archivoOficio->id_nuevo_oficio = $id;
			$archivoOficio->archivo = $archivo;
			$archivoOficio->nombre = $request->file->getClientOriginalName();
			$archivoOficio->save();	

            return response()->json([
                'id' => $archivoOficio->id,
                'path' => $path,
                'url' => \Storage::url($path),
            ]);
        }

        return response()->json(['error' => 'No se subió ningún archivo'], 400);
	}

	public function deleteFile(Request $request){
		$idArchivo = $request->getContent(); 

		if (!$idArchivo) {
			return response()->json(['error' => 'Archivo no especificado'], 400);
		}

		$archivo = ArchivoOficio::find($idArchivo);
		
		if (!$archivo) {
			return response()->json(['error' => 'Archivo no encontrado'], 400);
		}


        
        if (\Storage::disk('files')->exists($archivo->archivo)) {
            \Storage::disk('files')->delete($archivo->archivo);
			ArchivoOficio::where('id', $archivo->id)->delete();
            return response()->json(['success' => true]);
        }

        return response()->json(['error' => 'Archivo no encontrado'], 404);
	}

	public function downloadFiles($id, $tipo){
		$archivos = ArchivoOficio::where($tipo, $id)->get();

		if ($archivos->isEmpty()) {
			return redirect()->route('dashboard')->withErrors(['error' => 'No hay archivos para descargar']);
		}

		$zip = new \ZipArchive();
		$zipFileName = 'archivos_oficio_' . $id . '.zip';
		$tmpFile = tempnam(sys_get_temp_dir(), $zipFileName);

		if ($zip->open($tmpFile, \ZipArchive::CREATE) !== true) {
			return redirect()->route('dashboard')->withErrors(['error' => 'No se pudo crear el archivo comprimido.']);
		}

		foreach ($archivos as $archivo) {
			$path = \Storage::disk('files')->path($archivo->archivo);
			if (file_exists($path)) {
				$zip->addFile($path, $archivo->nombre);
			}
		}

		$zip->close();

		return response()->download($tmpFile, $zipFileName)->deleteFileAfterSend(true);
	}

    public function enviaOficio($id)
	{
        $oficio = Nuevo::find($id);

		$jefe = User::where('rol',3)->where('id_area', $oficio->id_area)->first();
		
        if(\Auth::user()->rol == 3){
            $oficio->revision = 1;
			$oficio->finalizado = 1;
			
			$asis = User::where('rol',5)->first();
			Mail::to($asis->email)->later(now()->addSeconds(2), new JefeNuevo($asis->name, $id));
			
		}else if(\Auth::user()->rol == 4 || \Auth::user()->rol == 2){
            $oficio->revision = 1;
			$usuario = infoUsuario($oficio->id_usuario);
			Mail::to($jefe->email)->later(now()->addSeconds(2), new ColaboradorNuevo($jefe->name, $usuario->name, $id));
        }else if(\Auth::user()->rol == 5){
			$oficio->finalizado = 1;
			$oficio->enviado = 1;
			$oficio->fecha_respuesta = date('Y-m-d H:i:s');
		}

        $oficio->descripcion_rechazo_jefe = null;
		$oficio->descripcion_rechazo_final = null;
		$oficio->save();

		return to_route('misOficios');
		
    }

    public function viewResp($id)
	{

		$archivos = ArchivoOficio::select('id','nombre', 'archivo')
		->where('id_nuevo_oficio', $id)
		->get()
		->map(function($archivo) {
			$extension = pathinfo($archivo->archivo, PATHINFO_EXTENSION);
			
			if($extension == "pdf" || $extension == "jpg" || $extension == "jpeg" || $extension == "png"){
				$tipo = 1;
				$url = $archivo->archivo;
			}else{
				$url = asset("files/".$archivo->archivo);
				$tipo = 2;
			}

            return [
				'id' => $archivo->id,
				'tipo' => $tipo,
				'url' => $url,
				'nombre' => $archivo->nombre,
				'extension' => $extension,
			];
            
        });

		$oficio = Nuevo::find($id);

		$destinatarios = DestinatarioOficio::select(
			'destinatarios_oficio.id',
			DB::raw("COALESCE(directorios.nombre, cat_destinatarios_externos.nombre) as nombre"),
			DB::raw("COALESCE(directorios.cargo, cat_destinatarios_externos.cargo) as cargo"),
			DB::raw("COALESCE(directorios.dependencia, cat_destinatarios_externos.dependencia) as dependencia"),
			'destinatarios_oficio.tipo_usuario',
			'destinatarios_oficio.id_usuario'
		)
		->leftJoin('directorios', function($join)
		{
			$join->on('destinatarios_oficio.tipo_usuario', '=', DB::raw("1"));
			$join->on('destinatarios_oficio.id_usuario', '=', 'directorios.id');

		})
		->leftJoin('cat_destinatarios_externos', function($join)
		{
			$join->on('destinatarios_oficio.tipo_usuario', '=', DB::raw("2"));
			$join->on('destinatarios_oficio.id_usuario', '=', 'cat_destinatarios_externos.id');

		})
		->where('destinatarios_oficio.id_oficio', $id)
		->orderBy('destinatarios_oficio.id', 'desc')
		->get();

    	return Inertia::render('Oficios/RevisaNuevo', [
            'status' => session('status'),
            'id' => $id,
			'archivos' => $archivos,
			'destinatariosOficio' => $destinatarios,
			'oficio' => $oficio,
        ]);
    }

	public function detalleOficio($id)
	{

		$oficio = Nuevo::find($id);

		$destinatarios = DestinatarioOficio::select(
			'destinatarios_oficio.id',
			DB::raw("COALESCE(directorios.nombre, cat_destinatarios_externos.nombre) as nombre"),
			DB::raw("COALESCE(directorios.cargo, cat_destinatarios_externos.cargo) as cargo"),
			DB::raw("COALESCE(directorios.dependencia, cat_destinatarios_externos.dependencia) as dependencia"),
			'destinatarios_oficio.tipo_usuario',
			'destinatarios_oficio.id_usuario'
		)
		->leftJoin('directorios', function($join)
		{
			$join->on('destinatarios_oficio.tipo_usuario', '=', DB::raw("1"));
			$join->on('destinatarios_oficio.id_usuario', '=', 'directorios.id');

		})
		->leftJoin('cat_destinatarios_externos', function($join)
		{
			$join->on('destinatarios_oficio.tipo_usuario', '=', DB::raw("2"));
			$join->on('destinatarios_oficio.id_usuario', '=', 'cat_destinatarios_externos.id');

		})
		->where('destinatarios_oficio.id_oficio', $id)
		->orderBy('destinatarios_oficio.id', 'desc')
		->get();

		$archivos = ArchivoOficio::select('id','nombre', 'archivo')
		->where('id_nuevo_oficio', $id)
		->get()
		->map(function($archivo) {
			$extension = pathinfo($archivo->archivo, PATHINFO_EXTENSION);
			
			if($extension == "pdf" || $extension == "jpg" || $extension == "jpeg" || $extension == "png"){
				$tipo = 1;
				$url = $archivo->archivo;
			}else{
				$url = asset("files/".$archivo->archivo);
				$tipo = 2;
			}

            return [
				'id' => $archivo->id,
				'tipo' => $tipo,
				'url' => $url,
				'nombre' => $archivo->nombre,
				'extension' => $extension,
			];
            
        });

    	return Inertia::render('Oficios/DetalleNuevoOficio', [
            'id' => $id,
			'destinatariosOficio' => $destinatarios,
			'oficio' => $oficio,
			'archivos' => $archivos,
        ]);
    }

	public function subeConfirmacionRecibidos($id)
	{
		$destinatarios = DestinatarioOficio::select(
			'destinatarios_oficio.id',
			DB::raw("COALESCE(directorios.nombre, cat_destinatarios_externos.nombre) as nombre"),
			DB::raw("COALESCE(directorios.cargo, cat_destinatarios_externos.cargo) as cargo"),
			DB::raw("COALESCE(directorios.dependencia, cat_destinatarios_externos.dependencia) as dependencia"),
			'destinatarios_oficio.tipo_usuario',
			'destinatarios_oficio.id_usuario',
			'archivo_respuesta',
			DB::raw("RIGHT(archivo_respuesta, 3) as extension"),
		)
		->leftJoin('directorios', function($join)
		{
			$join->on('destinatarios_oficio.tipo_usuario', '=', DB::raw("1"));
			$join->on('destinatarios_oficio.id_usuario', '=', 'directorios.id');

		})
		->leftJoin('cat_destinatarios_externos', function($join)
		{
			$join->on('destinatarios_oficio.tipo_usuario', '=', DB::raw("2"));
			$join->on('destinatarios_oficio.id_usuario', '=', 'cat_destinatarios_externos.id');

		})
		->where('destinatarios_oficio.id_oficio', $id)
		->orderBy('destinatarios_oficio.id', 'desc')
		->get();

		

    	return Inertia::render('Oficios/SubeConfirmacion', [
            'id' => $id,
			'destinatariosOficio' => $destinatarios,
        ]);
    }

    public function aceptResp($id)
	{
		$oficio = Nuevo::find($id);
		$asis = User::where('rol',5)->first();
		
		if(\Auth::user()->rol == 5){
			$jefe = User::where('rol',3)->where('id_area', $oficio->id_area)->first();
			
			$oficio->enviado = 1;
			$oficio->fecha_respuesta = date('Y-m-d H:i:s');

			$usuario = infoUsuario($oficio->id_usuario);
			
			$mail = Mail::to($jefe->email);
			if (!empty($usuario)) {
				$mail->cc($usuario->email);
			}
			$mail->later(now()->addSeconds(2), new Enviado(0, 0));

		}else{
			$usuario = infoUsuario($oficio->id_usuario);
			$oficio->finalizado = 1;
			Mail::to($usuario->email)->later(now()->addSeconds(1), new AceptaRespuestaJefe($usuario->name, 0,0));
			Mail::to($asis->email)->later(now()->addSeconds(2), new JefeNuevo($asis->name, $id));
			
		}
		$oficio->save();

		 if(\Auth::user()->rol == 3){
			return to_route('misOficios');
		}else{
			return to_route('oficiosRespuestas');
		}
    }

    public function subeEvidenciaRecibido(Request $request)
	{
		ini_set('upload_max_filesize', '30M');
    	ini_set('post_max_size', '30M');
    	
		$request->validate([
			'archivo' => 'required|file|max:25600|mimes:pdf,jpg,png,jpeg',
		]);

		$archivo = 'recibido_oficios/'.time()."_".\Auth::user()->id."_".$request->archivo->getClientOriginalName();
		$path = \Storage::disk('files')->put($archivo, \File::get($request->archivo));

		$oficio = Nuevo::find($request->id);
		$oficio->archivo_respuesta = $archivo;
		$oficio->save();

		
		return back()->with('status', "Se guardo la respuesta del oficio.");
		

	}

	public function rechazarResp(Request $request)
	{
    	$request->validate([
			'descripcion' => 'required|min:2|max:500',
        ]);

        $oficio = Nuevo::find($request->id);
		$usuario = infoUsuario($oficio->id_usuario);

		
		
		if(\Auth::user()->rol == 3){
			$oficio->descripcion_rechazo_jefe = $request->descripcion;
			$oficio->finalizado = null;
			$oficio->revision = 0;

			Mail::to($usuario->email)->later(now()->addSeconds(1), new RechazoRespuestaJefe(0, $request->descripcion, $usuario->name, $request->id, 0));
		}else{
			$oficio->descripcion_rechazo_final = $request->descripcion;
			$oficio->descripcion_rechazo_jefe = null;
			$oficio->finalizado = null;

			if($oficio->id_usuario != null){
				$oficio->revision = 0;
			}


			
			
			$jefe = User::where('rol',3)->where('id_area', $oficio->id_area)->first();
			Mail::to($jefe->email)->later(now()->addSeconds(1), new RechazoRespuestaFinal($jefe->name, 0, $request->descripcion, $request->id, 'jefe', $oficio->id_usuario, 0));

			if(!empty($usuario)){
				Mail::to($usuario->email)->later(now()->addSeconds(3), new RechazoRespuestaFinal($usuario->name, 0, $request->descripcion, $request->id, 'colaborador', $oficio->id_usuario, 0));
			}
		}
		
		
		$oficio->save();

		if(\Auth::user()->rol == 3){
			return to_route('misOficios');
		}else{
			return to_route('oficiosRespuestas');
		}
    }


	public function saveGrupal($numero){

		$ultimo = Variables::where('variable','Oficio')->first();
		$del = ($ultimo->valor + 1);
		$al = ($ultimo->valor + $numero);

		Variables::where('variable','Oficio')->update(['valor' => $al]);

		$jefe = User::select('iniciales')->where('rol',3)->where('id_area', \Auth::user()->id_area)->first();


		$nuevo = new Nuevo();
		$nuevo->folios_masivos = "del $del al $al";
		$nuevo->id_area = \Auth::user()->id_area;
		$nuevo->iniciales_area = $jefe->iniciales;
		$nuevo->id_usuario = \Auth::user()->rol == 4 ? \Auth::user()->id : null;
		$nuevo->iniciales_proceso =  \Auth::user()->rol == 4 ? \Auth::user()->iniciales : null;
		$nuevo->masivo = 1;
		if(\Auth::user()->rol == 3){
			$nuevo->revision = 1;
		}
		$nuevo->save();

		return redirect()->route('nuevoOficio',['id' => $nuevo->id])->with('status', "Se asigno el folio al oficio.");
	}

	public function saveNuevoOficioGrupal(Request $request)
	{
		ini_set('upload_max_filesize', '30M');
    	ini_set('post_max_size', '30M');

		$oficio = Nuevo::find($request->id);
		if (!$oficio) {
			return back()->with('error', "No se encontro el oficio." . '|' . time());
		}

		$valid = $oficio->archivo == null ? 'required' : 'nullable';

		$request->validate([
			'descripcion' => 'required|min:2|max:2000',
			'archivo' => $valid.'|file|max:25600|mimes:pdf,doc,docx',
		]);


		$oficio->descripcion = $request->descripcion;

		if($request->file('archivo')){
			$archivo = 'adjuntos_oficios/'.time()."_".\Auth::user()->id."_".$request->archivo->getClientOriginalName();
			$path = \Storage::disk('files')->put($archivo, \File::get($request->archivo));
			$oficio->archivo = $archivo;
		}

		

		$jefe = User::where('rol',3)->where('id_area', $oficio->id_area)->first();
		
        if(\Auth::user()->rol == 3){
            $oficio->revision = 1;
			$oficio->finalizado = 1;
			
			$asis = User::where('rol',5)->first();
			Mail::to($asis->email)->later(now()->addSeconds(2), new JefeNuevo($asis->name, $request->id));
			
		}else if(\Auth::user()->rol == 4 || \Auth::user()->rol == 2){
            $oficio->revision = 1;
			$usuario = infoUsuario($oficio->id_usuario);
			Mail::to($jefe->email)->later(now()->addSeconds(2), new ColaboradorNuevo($jefe->name, $usuario->name, $request->id));
        }else if(\Auth::user()->rol == 5){
			$oficio->finalizado = 1;
			$oficio->enviado = 1;
			$oficio->fecha_respuesta = date('Y-m-d H:i:s');
		}

        $oficio->descripcion_rechazo_jefe = null;
		$oficio->descripcion_rechazo_final = null;
		$oficio->save();

		return to_route('misOficios');

		
		
	}


	public function saveDestinatario(Request $request){
		$request->validate([
			'id' => 'required',
			'tipo' => 'required',
		],
		[
			'id.required' => 'El campo "Dirigido a" es obligatorio.',
			'tipo.required' => 'El campo destinatario es obligatorio.',
		]);

		$ultimo = Variables::where('variable','Oficio')->first();
		$oficio = ($ultimo->valor + 1);
		Variables::where('variable','Oficio')->update(['valor' => $oficio]);

		$destinatario = new DestinatarioOficio();
		$destinatario->tipo_usuario = $request->tipo;
		$destinatario->id_usuario = $request->id;
		$destinatario->id_oficio = $request->id_oficio;
		$destinatario->folio = $oficio;
		$destinatario->save();

		return back()->with('status', "Se guardo el destinatario.");
	}

	public function deleteDestinatario($id){
		$elimina = DestinatarioOficio::find($id);
		if($elimina){
			$elimina->delete();
			return back()->with('status', "Se elimino el destinatario.");
		}
		return back()->with('error', "No se encontro el destinatario.");
	}

	

	
}
