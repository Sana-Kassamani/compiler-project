<?php

namespace App\Http\Controllers\Files;

use App\Events\CodeUpdated;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Exception;
use Illuminate\Support\Facades\DB;

use App\Models\File;

class FilesController extends Controller
{
    public function validate($request)
    {
        foreach($request as $key => $value)
        {
            if (!$value ){
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
    public function get_collaborators($id){
        $user = auth()->user();
        if(!$id)
        {
            return response()->json([
                "message"=> "No selected file"
            ],400);
        }
        //SELECT * from collaborations as c INNER join users as u on c.collaborator_id = u.id where file_id = 13;
        $collaborators = DB::table('collaborations as c')
                        -> join('users as u','c.collaborator_id','=','u.id')
                        ->where('c.file_id','=',$id)
                        -> get();
        $owner=DB::table('files as f')
                        -> join('users as u','f.owner_id','=','u.id')
                        ->where('f.id','=',$id)
                        ->where('f.owner_id','!=',$user->id)
                        -> get();
        if(!$collaborators)
        {
            return response()->json([
                "message"=>"No collaborators on this file"
            ],200); 

        }
        return response()->json([
            "message"=>"Collaborators retrieved successfully",
            "collaborators"=> $collaborators,
            "owner"=>$owner
        ],200);

    }
   public function get_all_files(){
    $user = auth()->user(); // TODO
    $user_files= DB::table('files as f')
                    -> leftJoin('collaborations as c', 'f.id','=','c.file_id')
                    ->select('f.*', 'c.collaborator_type')
                    ->where('f.owner_id','=',$user->id)
                    -> orWhere('c.collaborator_id','=',$user->id)
                    -> get();
    if(!$user_files)
    {
        return response()->json([
            "message"=>"No files available"
        ],200); 
    }
    foreach($user_files as $key => $file)
        {
            if($file->owner_id === $user->id)
            {
                $file->shared=false;

            }
            else{
                $file->shared=true;
                $file->type = $file->collaborator_type;
            }
            $file->content=Storage::get($file->path);
        }
    return response()->json([
        "message"=>"Files retrieved successfully",
        "user_files"=> $user_files
    ],200);
   }

   public function save_file(Request $request){

    //validate request
    $file_param=[
        "id"=> $request->id,
        "file"=>$request->file
        ];

    if(!$this->validate($file_param))
    {
        return response()->json([
            "message"=> "All fields are required"
        ],400);
    }

    //get file path from db
    $user_file = File::find($file_param["id"]);
    if(!$user_file)
    {
        return response()->json([
            "message"=>"No file with this name is available"
        ],200); 
    }
    //delete from storage and save new copy
    if (Storage::exists($user_file->path)) {
        Storage::delete($user_file->path);
    }
    $new_path=Storage::putFile("CodeFiles",$file_param["file"]);
    
    // save new file path in db
    $user_file->path=$new_path;
    $user_file->save();
    $user_file->content=Storage::get($user_file->path);    
    return response()->json([
        "message"=>"File saved successfully",
        "user_file"=> $user_file
    ],200);
   }



   public function delete_file($id){
    $user = auth()->user();
    if(!$id)
    {
        return response()->json([
            "message"=> "All fields are required"
        ],400);

    }
    $user_file = File::find($id);
    if(!$user_file)
    {
        return response()->json([
            "message"=>"No file with this name to delete"
        ],200); 
    }
    if (Storage::exists($user_file->path)) {
        Storage::delete($user_file->path);
       
    }
    
    File::destroy($id);

    return response()->json([
        "message"=>"File deleted successfully"
    ],200);
    }
   
    // public function get_file($id){
    //     $user_file = File::find($id);
    //     if(!$user_file)
    //     {
    //         return response()->json([
    //             "message"=>"No file available"
    //         ],200); 
    //     }
    //     return response()->json([
    //         "message"=>"File retrieved successfully",
    //         "user_file"=> $user_file
    //     ],200);
       
    // }
}
