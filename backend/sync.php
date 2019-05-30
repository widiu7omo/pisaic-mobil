<?php
ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(-1);
    require './connection.php';
    $datarows = [];
    $selectWhereString ='';
    if(isset($_GET['data'])){
        
        if(isset($_GET['where'])){
        $selectWhere = explode(',',$_GET['where']);
        $selectWhereString .= 'WHERE ';
        $selectWhereString .= join('=',$selectWhere);
        }
        $query = "select * from $_GET[data] $selectWhereString";
        // var_dump($query);
        $result = $conn->query($query);
        if($result->num_rows > 0){
            while($row = $result->fetch_assoc()){
                array_push($datarows,$row);
            }
        }
    }
    if(isset($_GET['input'])){
        $post=$_POST;
        $get= $_GET;
        $table = $get['input'];
        $data = [];
        $data = json_decode($post[$table]);
            //HEADER
            if(count($data) > 0){
            $headers = [];
            foreach($data[0] as $key=> $header){
                $headers[] = $key;
            }
            $headerString = join(',',$headers);
            // var_dump($joinedKey);
            //retrive values
            //TODO:Filter single quote character from input
            //VALUES
            foreach($data as $dat){
                $values = '';
                $updateVal= '';
                foreach($headers as $key => $header){
                    $values .="'".$dat->{$header}."'";
                    
                    $updateVal .= "$header = '".$dat->{$header}."'";
                    if(sizeof($headers) != $key+1){
                        $values .=',';
                        $updateVal .= ',';
                    }
                }
                //UPDATE IF DUPLICATE
                $query = "INSERT INTO $_GET[input] ($headerString) SELECT $values ON DUPLICATE KEY UPDATE $updateVal";
                // var_dump($query);
                $conn->query($query) or die($conn->error);
            }
            
        }
        // $values = '';
        //     foreach($data as $key=> $dat){
        //         $values .= "(";
        //         foreach($columns as $keyHead => $header){
        //             $values .= '`'.$dat->{$header}.'`';
        //             if(sizeof($columns) != $keyHead+1){
        //                 $values .= ",";
        //             }
        //         }
        //         $values .= ")";
        //         if(sizeof($data) != $key+1){
        //             $values .= ",";
        //         } 
        //     }
        //     $updateVal = "";
        //     foreach($data as $key=> $dat){
        //         $updateVal = "";
        //         foreach($columns as $keyHead => $header){
        //             $values .= '`'.$dat->{$header}.'`';
        //             if(sizeof($columns) != $keyHead+1){
        //                 $values .= ",";
        //             }
        //         }
        //         $values .= ")";
        //         if(sizeof($data) != $key+1){
        //             $values .= ",";
        //         } 
        //     }
            
        //     // var_dump($values);
        //     $query = "INSERT INTO $_GET[input] ($joinedKey) VALUES $values ON DUPLICATE KEY UPDATE name=A, age=19";
        //     // $query = "insert into $_GET[input] ($joinedKey) values $values";
        //     // var_dump($query);
        //     $conn->query($query) or die($conn->error);
        // $columns = array_keys($post);
        // $values = array_map(function($input) use ($post){
        //     return '"'.$post[$input].'"';
        // },$columns);
        // $joinedValues = join(',',$values);
        // $joinedColumns = join(',',$columns);
        // $query = "insert into $_GET[input] ($joinedColumns) values($joinedValues)";
        // $conn->query($query) or die($conn->mysqli_error());
    }

    
    echo json_encode($datarows);
?>