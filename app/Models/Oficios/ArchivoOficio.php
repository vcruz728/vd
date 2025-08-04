<?php

namespace App\Models\Oficios;

use Illuminate\Database\Eloquent\Model;

class ArchivoOficio extends Model
{
    protected $table = 'archivos_oficios';

    protected $fillable = [
        'id_oficio',
        'archivo',
    ];

    public function oficio()
    {
        return $this->belongsTo(Oficio::class, 'id_oficio');
    }
}
