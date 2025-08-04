<?php

namespace App\Models\Oficios;

use Illuminate\Database\Eloquent\Model;

class Copia extends Model
{
    protected $table = 'oficios_copias';

    protected $fillable = [
        'id_oficio',
        'nombre',
        'cargo',
        'dependencia'
    ];

    public function oficio()
    {
        return $this->belongsTo(Oficio::class, 'id_oficio');
    }

}
