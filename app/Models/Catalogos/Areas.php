<?php

namespace App\Models\Catalogos;

use Illuminate\Database\Eloquent\Model;

class Areas extends Model
{
    
    protected $table = 'cat_areas';

    public static  function getSel(){
    	return self::select('id as value','nombre as label')->orderBy('nombre')->get();
    }
}
