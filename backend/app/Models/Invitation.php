<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invitation extends Model
{
    protected $fillable = [
        'inviting_user_id',
        'invited_user_id',
        'file_id',
        'status',
        'invited_user_type',
    ];
}
