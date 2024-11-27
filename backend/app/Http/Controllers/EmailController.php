<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EmailController extends Controller
{
    public function invite(Request $request){
        $email = Invitations::create([
            "inviting_user_id" => $request->inviting,
            "invited_user_id" => $request->invited,
            "file_id" => $request->file,
            "status" => $request->status,
            "invited_user_type" => $request->type
        ]);

        return response()->json([
            "new_invitation" => $email
        ]);
    }
    public function accept($id, Request $request){
        $email = Invitations::find($id)->update([
            
        ]);
    }
}
