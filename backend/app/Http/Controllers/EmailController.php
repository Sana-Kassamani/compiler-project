<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Invitation;

class EmailController extends Controller
{
    public function invite(Request $request){
        $email = Invitation::create([
            "inviting_user_id" => $request->inviting,
            "invited_user_id" => $request->invited,
            "file_id" => $request->file,
            "status" => 'pending',
            "invited_user_type" => $request->type
        ]);

        return response()->json([
            "new_invitation" => $email
        ]);
    }
    public function accept(Request $request){
        $email = Invitation::find($request->id)->update([
            'status' => 'accepted'
        ]);
        return response()->json([
            'updated_invitation' => $email
        ]);
    }
    
}
