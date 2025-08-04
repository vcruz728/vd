<?php

namespace App\Models\Oficios;

use Illuminate\Database\Eloquent\Model;

class RespuestaOficio extends Model
{
    protected $table = 'respuestas_oficio';

    protected $fillable = [
        'id_oficio',
        'id_directorio',
        'tipo_destinatario',
        'nombre',
        'cargo',
        'dependencia',
        'respuesta',
    ];

    public function oficio()
    {
        return $this->belongsTo(Oficio::class, 'id_oficio');
    }
}
