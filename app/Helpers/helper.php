<?php
use Carbon\Carbon;
use App\Models\Bitacoras\BitOficios;
use App\Models\User;
  
/**
 * Inserta la bitacora del oficio
 *
 * @return void
 */
if (! function_exists('iBitacoraOficio')) {
    function iBitacoraOficio($id, $accion, $descripcion, $icon, $color)
    {
        $bitacora = new  BitOficios();
        $bitacora->id_oficio = $id;
        $bitacora->accion = $accion;
        $bitacora->descripcion = $descripcion;
        $bitacora->icono = $icon;
        $bitacora->color = $color;
        $bitacora->save();
    }
}


/**
 * Obtiene la información de un usuario
 *
 * @return void
 */
if (! function_exists('infoUsuario')) {
    function infoUsuario($id)
    {
        return User::where('id', $id)->first();
    }
}