<?php
if(isset( $_GET['uri'])){
    switch ($_GET['uri']){
        case 'pisheet':
            include 'pisheet.php';
            break;
        case 'ci':
            include 'camera_inspection.php';
            break;
        default:echo "Route not found";
    }
}
else{
    echo "Not Allowed 504:";
}
?>