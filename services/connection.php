<?php
class Connection
{
    public $hostname = 'localhost';
    public $port        = 5432;
    public $database    = 'malaya';
    public $username     = 'postgres';
    public $password     = '123';
    public $conDB;

    public function connectionDB(){

        $this->conDB = pg_connect("host=$this->hostname port=$this->port dbname=$this->database user=$this->username password=$this->password");

        if(!$this->conDB)
        {
            die("connection failed");
        }
    }
    public function closeConnection(){
        pg_close($this->conDB);
    }
}

$con = new Connection();
echo $con->connectionDB();
?>