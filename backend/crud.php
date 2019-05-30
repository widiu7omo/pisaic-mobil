<?php
namespace Tools;
ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(-1);
class Crud {
    public $table;
    public $columns = [];
    public $datas;
    private $_connection;

    function __construct()
    {
        $this->_connection = new \mysqli('127.0.0.1','root','','apipisaic');
    }
    public function insert(){
        $columns = join(',',$this->columns);
        $datas = join(',',$this->datas);
        $result = $this->_connection->query("insert into units (name) values ('SE0020')") or die($this->_connection->connect_error());
        return $result;
    }
    public function update(){

    }
    public function delete(){
        
    }
    public function select(){
        $result = $this->_connection->query('select * from units');
        return $result;
    }
}
