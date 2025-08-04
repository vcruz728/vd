<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class FilesController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, $carpeta,$path)
    {
        abort_if(
            ! Storage::disk('files') ->exists($carpeta.'/'.$path),
            404,
            "The file doesn't exist. Check the path."
        );

        return Storage::disk('files')->response($carpeta.'/'.$path);
    }
}
