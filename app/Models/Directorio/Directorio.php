<?php

namespace App\Models\Directorio;

use Illuminate\Database\Eloquent\Model;

class Directorio extends Model
{
    protected $table = 'directorios';

    protected $fillable = [
        'nombre',
        'cargo',
        'dependencia'
    ];

    public static  function getSel(){
    	return self::select('id as value','nombre as label')->orderBy('nombre')->get();
    }
}
