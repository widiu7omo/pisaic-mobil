<?php

if(isset($_GET['image'])){
    $post = $_POST;
    $imageName = [];
    var_dump($post);
    var_dump($_FILES);
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