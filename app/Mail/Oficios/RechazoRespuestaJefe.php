<?php

namespace App\Mail\Oficios;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class RechazoRespuestaJefe extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(public $folio, public $descripcion, public $nombre, public $id_oficio, public $tipo = 1)
    {
        // 
    }
 

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        $titulo = $this->tipo == 1 ? 'Respuesta a oficio rechazada' : 'Oficio rechazado';
        return new Envelope(
            subject: $titulo,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'Emails.Oficios.RechazoRespuesta',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
