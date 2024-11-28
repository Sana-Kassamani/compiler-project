<?php


// routes/channels.php

use Illuminate\Support\Facades\Broadcast;
use App\Http\Controllers\ChannelController;

// Define the channel to listen for file updates, and delegate to the controller
Broadcast::channel('file.{fileId}', [ChannelController::class, 'authorizeFileAccess']);



//Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
//    return (int) $user->id === (int) $id;
//});
// Broadcast::channel('document', function ($user) {
//     return true; // Allow access to the 'document' channel
// });