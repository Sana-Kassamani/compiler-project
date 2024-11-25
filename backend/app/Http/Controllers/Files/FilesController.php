<?php

namespace App\Http\Controllers\Files;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Exception;

use App\Models\File;

class FilesController extends Controller
{
    public function validate($request)
    {
        foreach($request as $key => $value)
        {
            if (empty($value)){
                return false;
            }
        }
        return true;

    }
    private function create_storage_file($file){
        if(!Storage::exists("CodeFiles")){
            Storage::makeDirectory("CodeFiles");
            }
        return Storage::putFile("CodeFiles", $file);

    }
    public function create_file(Request $request)
    {
        
        $user = auth()->user();
        $file_param=[
            "filename"=> $request->filename,
            "language"=> $request->language,
            "owner_id"=> $user->id, 
            "path"=>$request->file
            ];
        if(!$this->validate($file_param))
        {
            return response()->json([
                "message"=> "All fields are required"
            ],400);
        }
        $path= $this->create_storage_file($request->file);
        $file_param["path"]=$path;
        $new_file=File::create($file_param);
        return response()->json([
            "message"=>"File created successfully",
            "file"=> $new_file
        ],200);

        
    }
}
