<?php

namespace App\Models\Oficios;

use Illuminate\Database\Eloquent\Model;

class Oficio extends Model
{
    protected $table = 'oficios';

    protected $casts = [
    	'finalizado' => 'integer',
        'respuesta' => 'integer',
        'enviado' => 'integer',
    ];

}
