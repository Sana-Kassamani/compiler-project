<?php

namespace App\Http\Controllers\Collaboration;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Events\DocumentUpdated;
use Illuminate\Support\Facades\Log;
use Illuminate\Broadcasting\InteractsWithSockets;

class DocumentController extends Controller
{
    public function update(Request $request)
    {
        broadcast(new DocumentUpdated($request->content, $request->socket_id))->toOthers();
        // event(new DocumentUpdated($request->content));
        
        Log::info('Broadcasting updated content: ' . $request->content);
        return response()->json([
            "request" => $request,
            'status' => 'Document updated successfully!']);
    }
}
