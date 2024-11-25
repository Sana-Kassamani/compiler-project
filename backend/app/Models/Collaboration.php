<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Collaboration extends Model
{
    protected $fillable = [
        'file_id',
        'collaborator_id',
        'collaborator_type',
    ];
}
