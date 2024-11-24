<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\Invitation;

class MailController extends Controller
{
    public function sendMail() {
        Mail::to('arefahrm@gmail.com')->send(new Invitation());
    }
}
