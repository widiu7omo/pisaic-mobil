<?php

if(isset($_GET['image'])){
    $post = $_POST;
    $imageName = [];
    // Image uploading folder.
    $target_dir = "uploads";
    $name =time().'_'.basename($file['name']);
    if ($_FILES['photo']) {
        $reArrayFiles = reArrayFiles($_FILES['photo']);

        foreach ($reArrayFiles as $file) {
            $newname = date('YmdHis',time())."_".mt_rand().'.jpg';
            $imageName[] = array("name"=>$newname);
            move_uploaded_file($file['tmp_name'],'./uploads/'.$newname);
            // var_dump($file);
        }
    }
    // if(gettype($_FILES) == 'array'){
    //     foreach($_FILES as $key=>$file){
    //         // var_dump($file);
    //         // Generating random image name each time so image name will not be same .
    
    //         $target_dir = "$target_dir /$name";
    //         $imageName[] =$name;
    //         // Receiving image sent from Application
    //         var_dump($file['tmp_name']);
    //         move_uploaded_file($_FILES['photo']['tmp_name'][$key], $target_dir);
            
    //         // Adding domain name with image random name.
    //         $target_dir = getcwd(). $target_dir ;
    //         // Inserting data into MySQL database.
    //         // mysql_query("insert into image_upload_table ( image_tag, image_path) VALUES('$img_tag' , '$target_dir')");
    // }
    
    echo json_encode(array('status'=>'success','uploaded'=>json_encode($imageName),'count'=>count($imageName)));
    // }
}
function reArrayFiles(&$file_post) {

    $file_ary = array();
    $file_count = count($file_post['name']);
    $file_keys = array_keys($file_post);

    for ($i=0; $i<$file_count; $i++) {
        foreach ($file_keys as $key) {
            $file_ary[$i][$key] = $file_post[$key][$i];
        }
    }

    return $file_ary;
}
?>