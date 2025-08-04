<?php

namespace App\Http\Controllers\Catalogos;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Catalogos\DestinatarioExterno;

class CatalogosController extends Controller
{
    public function indexExternos()
    {   
        $destinatarios = DestinatarioExterno::where('id_area', \Auth::user()->id_area)->withTrashed()->get();

        return Inertia::render('Catalogos/DestinatariosExternos', [
            'destinatarios' => $destinatarios
        ]);
    }

    public function saveDestinatario(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|min:2|max:255',
            'cargo' => 'required|string|min:2|max:255',
            'dependencia' => 'required|string|min:2|max:255',
            'email' => 'required|email|min:2|max:255',
        ]);

        if($request->id == 0){
            $destinatario = new DestinatarioExterno();
        } else {
            $destinatario = DestinatarioExterno::find($request->id);
        }


        $destinatario->id_area = \Auth::user()->id_area;
        $destinatario->nombre = $request->nombre;
        $destinatario->cargo = $request->cargo;
        $destinatario->dependencia = $request->dependencia;
        $destinatario->email = $request->email;

        $destinatario->save();

        return redirect()->route('catalogos.destinatariosExternos')->with('success', 'Destinatario externo guardado exitosamente.');
    }

    public function deleteDestinatario($id)
    {
        $destinatario = DestinatarioExterno::find($id);
        
        if ($destinatario) {
            $destinatario->delete();
            return redirect()->route('catalogos.destinatariosExternos')->with('success', 'Destinatario externo eliminado exitosamente.');
        }

        return redirect()->route('catalogos.destinatariosExternos')->with('error', 'Destinatario externo no encontrado.');
    }
    
    public function reactivateDestinatario($id)
    {
        $destinatario = DestinatarioExterno::withTrashed()->find($id);
        
        if ($destinatario) {
            $destinatario->restore();
            return redirect()->route('catalogos.destinatariosExternos')->with('success', 'Destinatario externo reactivado exitosamente.');
        }

        return redirect()->route('catalogos.destinatariosExternos')->with('error', 'Destinatario externo no encontrado.');
    }
}   
         