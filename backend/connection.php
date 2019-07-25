<?php
$conn = new mysqli('127.0.0.1','root','','apipisaic');
// $conn = new mysqli('202.52.147.116','dioinsta_pisaic','pisaic2019','dioinsta_pisaic');

if($conn->connect_error){
    die('Connection failed: '.$conn->connect_error);
}
?>