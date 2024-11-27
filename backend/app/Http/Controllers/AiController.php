<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use OpenAI\Laravel\Facades\OpenAI;

class AiController extends Controller
{
    public function analyze(Request $request) {
        $userCode = $request->input('code');

        $result = OpenAI::chat()->create([
            'model' => 'gpt-3.5-turbo',
            'messages' => [
                ['role' => 'system', 'content' => 'You are a skilled developer and you are the best at finding bugs.'],
                ['role' => 'user', 'content' => 'Analyze this code: ' . $userCode],
            ],
        ]);

        $botMessage = $result['choices'][0]['message']['content'];

        return response()->json(['message' => $botMessage]);
    }

    public function debug(Request $request) {
        $userCode = $request->input('code');

        $result = OpenAI::chat()->create([
            'model' => 'gpt-3.5-turbo',
            'messages' => [
                ['role' => 'system', 'content' => 'You are a skilled developer and you are the best at finding bugs.'],
                ['role' => 'user', 'content' => 'Debug this code and only tell me if there is a bug in the code, what is it, on which line, and how to fix it: ' . $userCode. 'If there is no bug tell me that there is no bug'],
            ],
        ]);

        $botMessage = $result['choices'][0]['message']['content'];

        return response()->json(['message' => $botMessage]);
    }
}
