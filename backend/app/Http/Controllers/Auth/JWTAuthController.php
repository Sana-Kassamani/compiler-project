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
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json(compact('user','token'), 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        echo json_encode($credentials);
        try {
            echo "Im here at 50";
            
            if (! $token = JWTAuth::attempt($credentials)) {
                echo "Im here at 52";
                return response()->json(['error' => 'Invalid credentials'], 401);
            }
            echo "Im here at 53";
            // Get the authenticated user.
            $user = auth()->user();

            // (optional) Attach the role to the token.
            // $token = JWTAuth::claims(['role' => $user->role])->fromUser($user);
            echo "Im here at 59";
            $token = JWTAuth::fromUser($user);

            return response()->json(compact('token'));
        } catch (JWTException $e) {
            return response()->json(['error' => 'Could not create token'], 500);
        }
    }

    public function getUser()
    {
        echo "I'm in getUser";
        try {
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['error' => 'User not found'], 404);
            }
        } catch (Exception $e) {
            return response()->json(['error' => 'Invalid token'], 400);
        }

        return response()->json(compact('user'));
    }

    // User logout
    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function unauthorized(){
        return response()->json(['message' => 'Unauthorized access'],401);
    }













// Create a new AuthController instance.
    // return void
    // public function __construct()
    // {
    //     $this->middleware('auth:api', ['except' => ['login']]);
    // }

    // Get a JWT via given credentials.
    // return \Illuminate\Http\JsonResponse
    // public function login()
    // {
    //     $credentials = request(['email', 'password']);

    //     if (! $token = auth()->attempt($credentials)) {
    //         return response()->json(['error' => 'Unauthorized'], 401);
    //     }

    //     return $this->respondWithToken($token);
    // }

    // Get the authenticated User.
    // retrun \Illuminate\Http\JsonResponse
    public function me()
    {
        return response()->json(auth()->user());
    }

    // Log the user out (Invalidate the token).
    // return \Illuminate\Http\JsonResponse
    // public function logout()
    // {
    //     auth()->logout();

    //     return response()->json(['message' => 'Successfully logged out']);
    // }
     
    // Refresh a token.
    // return \Illuminate\Http\JsonResponse
    
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }


    // Get the token array structure.
    // param  string $token
    // return \Illuminate\Http\JsonResponse
    
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
    
}
