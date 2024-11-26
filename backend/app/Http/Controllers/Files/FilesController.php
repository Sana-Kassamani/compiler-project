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

   public function get_all_files(){
    $user = auth()->user(); // TODO
    $user_files = File::where('owner_id', $user->id)->get();
    if(!$user_files)
    {
        return response()->json([
            "message"=>"No files available"
        ],200); 
    }
    return response()->json([
        "message"=>"Files retrieved successfully",
        "user_files"=> $user_files
    ],200);
   }

   public function edit_file(Request $id){
    $user = auth()->user();//TODO
    $file_param=[
        "id"=> $request->file_id,
        "file"=>$request->file
        ];
    if(!$this->validate($file_param))
    {
        return response()->json([
            "message"=> "All fields are required"
        ],400);
    }
    $user_file = File::find($file_param->id);
    if(!$user_file)
    {
        return response()->json([
            "message"=>"No file with this name is available"
        ],200); 
    }
    if (!Storage::exists($user_file->path)) {
        return response()->json([
            "message"=>"No stored file"
        ],200); 
    }
    Storage::put($user_file->path, $file_param->file);
    return response()->json([
        "message"=>"File saved successfully",
        "user_files"=> $user_files
    ],200);
   }


   //save file ...edit
   //delete file
   // get one file
}