<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class DocumentUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $content;
    public $socket_id;
    /**
     * Create a new event instance.
     */
    public function __construct($content,$socket_id)
    {
        $this->dontBroadcastToCurrentUser();
        $this->content = $content;
        $this->socket_id= $socket_id;        
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn() : Channel
    {
        // return ['document'];
        return new Channel('document');
    }
    public function broadcastAs()
    {
        return "DocumentUpdated";
    }
    public function broadcastWith()
    {
        Log::info('broadcastWith:', ['content' => $this->content]);
        return ['content' => $this->content, 'socket_id'=> $this->socket_id];
    }
    public function broadcastWhen()
    {
        return !auth()->user();
    }
    
}
