<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class CodeUpdated implements ShouldBroadcast
{
    use InteractsWithSockets, SerializesModels;

    public $code;
    public $fileId;

    public function __construct($code, $fileId)
    {
        $this->code = $code;
        $this->fileId = $fileId;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('file.' . $this->fileId);
    }

    public function broadcastAs()
    {
        return 'code.updated';
    }
}
