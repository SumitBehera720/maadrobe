<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class NewsletterController extends Controller
{
    public function subscribe(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $email = $request->input('email');

        // You could save this to a NewsletterSubscribers table here, 
        // but for now we just send the email as requested.

        try {
            Mail::raw("Welcome to the MAA ◆ DROBE family!\n\nThank you for subscribing to our newsletter. We're excited to share our latest handcrafted collections, private sales, and tailoring promotions with you.\n\nUse code WELCOME10 for 10% off your first order.\n\nBest,\nThe MAA ◆ DROBE Team", function ($message) use ($email) {
                $message->to($email)
                        ->subject('Welcome to MAA ◆ DROBE!');
            });
            return response()->json(['success' => true, 'message' => 'Subscribed successfully!']);
        } catch (\Exception $e) {
            \Log::error('Newsletter email failed: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => 'Failed to send email.'], 500);
        }
    }
}
