<?php
require_once 'connection.php';

if(isset($_GET['image'])){
    $post = $_POST;
    $imageName = [];
    // var_dump($post);
//     var_dump($_FILES);
    // Image uploading folder.
    $target_dir = "uploads";
//    $name =time().'_'.basename($file['name']);
    if ($_FILES['photo']) {
        $reArrayFiles = reArrayFiles($_FILES['photo']);
        $index_foto = null;
//var_dump( $reArrayFiles);
        foreach ($reArrayFiles as $file) {
            $file_name = explode( '#', $file['name']);
            if(count($file_name)>1){
	            $index_foto = $file_name[0];
	            $encode_name = $file_name[1];
            }
            else {
	            $encode_name = $file['name'];
            }
            $imageName[] = array("name"=>$file['name']);
            $res = $conn->query("SELECT group_kind_unit_zones.`input_items` FROM group_kind_unit_zones where `input_items` LIKE '%$encode_name%'");
            $result = $res->fetch_assoc();
            $decodeInputs = json_decode($result['input_items']);

            if($index_foto != null){
            	changeUriFile( $decodeInputs, $index_foto, $encode_name,$conn);
            }
            move_uploaded_file($file['tmp_name'],'./uploads/'.$encode_name);
            // var_dump($file);
        }
    }
    
    echo json_encode(array('status'=>'success','uploaded'=>json_encode($imageName),'count'=>count($imageName)));
    // }
}
function changeUriFile($data_array,$index_array,$photo_name,$conn){
	$data_array[$index_array]->foto->name = $photo_name;
//	var_dump( $data_array);
	$decoded_input = json_encode( $data_array);
	$conn->query("UPDATE group_kind_unit_zones SET input_items=$decoded_input WHERE `input_items` LIKE '%$photo_name%'");
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