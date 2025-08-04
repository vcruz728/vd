<?php

namespace App\Models\Catalogos;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DestinatarioExterno extends Model
{
    use SoftDeletes;

    protected $table = 'cat_destinatarios_externos';

    protected $fillable = [
        'id_area',
        'nombre',
        'cargo',
        'dependencia',
        'email'
    ];

    public function area()
    {
        return $this->belongsTo('App\Models\Catalogos\Area');
    }

    public static  function getSel(){
    	return self::select('id as value','nombre as label')->where('id_area', \Auth::user()->id_area)->orderBy('nombre')->get();
    }
}
