<?php

namespace App\Mail;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OrderStatusMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Order $order,
        public string $oldStatus
    ) {}

    public function envelope(): Envelope
    {
        $subject = $this->order->status === 'cancelled'
            ? "Order #{$this->order->order_number} Has Been Cancelled — MaaDrobe"
            : "Your Order #{$this->order->order_number} Update — MaaDrobe";

        return new Envelope(subject: $subject);
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.order_status',
        );
    }
}
