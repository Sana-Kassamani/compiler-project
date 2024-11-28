<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Invitation;
use Illuminate\Support\Facades\DB;

class EmailController extends Controller
{
    public function invite(Request $request){
        $user = DB::table('users')->where('email', $request->invited)->first();

        if(!$user){
            return response()->json([
                'error' => 'User not found'
            ]);
        }
        
        $email = Invitation::create([
            "inviting_user_id" => $request->inviting,
            "invited_user_id" => $user->id,
            "file_id" => $request->file,
            "status" => 'pending',
            "invited_user_type" => $request->type
        ]);

        return response()->json([
            "new_invitation" => $email
        ]);
    }
    public function accept($id){
        $email = Invitation::find($id);
        $email->status = 'accepted';
        $email->save();

        DB::table('collaborations')->insert([
            'collaborator_id' => $email->invited_user_id,
            'collaborator_type' => $email->invited_user_type,
            'file_id' => $email->file_id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    
        return response()->json([
            'message' => 'Invitation accepted and collaboration created',
            'invitation' => $email
        ]);
    }
    
}
