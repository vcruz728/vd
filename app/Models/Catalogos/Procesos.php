<?php

namespace App\Models\Catalogos;

use Illuminate\Database\Eloquent\Model;

class Procesos extends Model
{
    
    protected $table = 'cat_procesos';

    public static  function getSel(){
    	return self::select('id as value','nombre as label')->orderBy('nombre')->get();
    }

    public static  function getSelForArea($id){
    	return self::select('id as value','nombre as label')->where('id_area', $id)->orderBy('nombre')->get();
    }
}
