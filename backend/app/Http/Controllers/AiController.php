<?php

use Illuminate\Http\Request;
use OpenAI\OpenAI;

class AiController extends Controller
{
    public function analyse(Request $request) {
        $userCode = $request->input('code');

        $openai = new OpenAI();
        $response = $openai->completions->create([
            'model' => 'gpt-3.5-turbo',
            'messages' => [
                ['role' => 'system', 'content' => 'You are a skilled developer and you are the best at finding bugs.'],
                ['role' => 'user', 'content' => 'Analyze this code' . $userCode],
            ],
        ]);

        $botMessage = $response->data['choices'][0]['message']['content'];

        return response()->json(['message' => $botMessage]);
    }

    public function debug(Request $request) {
        $userCode = $request->input('code');

        $openai = new OpenAI();
        $response = $openai->completions->create([
            'model' => 'gpt-3.5-turbo',
            'messages' => [
                ['role' => 'system', 'content' => 'You are a skilled developer and you are the best at finding bugs.'],
                ['role' => 'user', 'content' => 'Debug this code' . $userCode],
            ],
        ]);

        $botMessage = $response->data['choices'][0]['message']['content'];

        return response()->json(['message' => $botMessage]);
    }
}