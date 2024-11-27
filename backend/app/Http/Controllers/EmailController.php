<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EmailController extends Controller
{
    public function accept($id, Request $request){
        $course = Course::find($id)->update([
            
        ]);
    }
}
