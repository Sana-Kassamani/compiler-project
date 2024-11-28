<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; //added
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class JWTAuthController extends Controller
{
    
    public function register(Request $request)
    {
        if(!$request->username || !$request->password || !$request-> email)
        {
            return response()->json([
                "message"=> "All fields are required!"
            ], 400);

        }
        $user = new User;
        $user->username = $request->username;
        $user->password = Hash::make($request->password);
        $user->email = $request->email;
        $user->save();

        $token = JWTAuth::fromUser($user);

        // $validator = Validator::make($request->all(), [
        //     'username' => 'required|string|max:255',
        //     'email' => 'required|string|email|max:255|unique:users',
        //     'password' => 'required|string|min:6',
        // ]);

        // if($validator->fails()){
        //     return response()->json($validator->errors()->toJson(), 400);
        // }

        // $user = User::create([
        //     'username' => $request->username,
        //     'email' => $request->email,
        //     'password' => Hash::make($request->password),
        // ]);

        // $token = JWTAuth::fromUser($user);

        return response()->json([
            "user"=>$user,
            "token"=>$token,
        ], 201);
    }

    public function login(Request $request)
    {
        if(!$request->password || !$request-> email)
        {
            return response()->json([
                "message"=> "All fields are required!"
            ], 400);

        }
        $credentials = $request->only('email', 'password');
        try {
            
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['message' => 'Invalid credentials'], 401);
            }
            // Get the authenticated user.
            $user = Auth::user();

            // (optional) Attach the role to the token.
            // $token = JWTAuth::claims(['role' => $user->role])->fromUser($user);
            $token = JWTAuth::fromUser($user);

            return response()->json([
                "token"=>$token,
            ],200);
        } catch (JWTException $e) {
            return response()->json(['message' => 'Could not create token'], 500);
        }
    }

    public function getUser()
    {
        try {
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['error' => 'User not found'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Invalid token'], 400);
        }

        return response()->json([
            "user"=>$user
        ]);
    }

    // User logout
    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());

        return response()->json(['message' => 'Successfully logged out'],200);
    }

    public function unauthorized(){
        return redirect()->route('unauthorized');
    }

    
}
