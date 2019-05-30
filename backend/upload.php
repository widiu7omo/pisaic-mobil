<?php
if(isset($_GET['image'])){
    $post = $_POST;
    var_dump($_FILES);
    // Image uploading folder.
    $target_dir = "uploads";
    
    // Generating random image name each time so image name will not be same .
    $target_dir = $target_dir . "/" .rand() . "_" . time().".jpg";
    
    // Receiving image tag sent from application.
    $img_tag = $_POST["photo"];
    
    // Receiving image sent from Application	
    if(move_uploaded_file($_FILES['photo']['tmp_name'], $target_dir)){
    
    // Adding domain name with image random name.
    $target_dir = getcwd(). $target_dir ;
    // Inserting data into MySQL database.
    // mysql_query("insert into image_upload_table ( image_tag, image_path) VALUES('$img_tag' , '$target_dir')");
    
    $MESSAGE = "Image Uploaded Successfully." ;
    
    // Printing response message on screen after successfully inserting the image .	
    echo json_encode(array('status'=>'success','path'=>$target_dir));
    }
}
?>