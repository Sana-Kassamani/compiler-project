<?php

use Illuminate\Http\Request;
use OpenAI\OpenAI;

class ChatController extends Controller
{
    public function chat(Request $request)
    {
        $userMessage = $request->input('message');

        $openai = new OpenAI();
        $response = $openai->completions->create([
            'model' => 'gpt-3.5-turbo',
            'messages' => [
                ['role' => 'system', 'content' => 'You are a skilled developer and you are the best at finding bugs.'],
                ['role' => 'user', 'content' => $userMessage],
            ],
        ]);

        $botMessage = $response->data['choices'][0]['message']['content'];

        return response()->json(['message' => $botMessage]);
    }
}