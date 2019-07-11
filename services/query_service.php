<?php
include("connection.php");

class Asset extends connection {
    function __construct()
    {
        $this->connectionDB();

    }

    public function getAsset() {

        $lyr = $_REQUEST['layer'];

            $sql = "SELECT * from asset where layer='$lyr'";

        $output = array();

        $result_query = pg_query($sql);
        if ($result_query) {
            $output = pg_fetch_all($result_query);
        }

        return json_encode($output);

        $this->closeConnection();
    }
}

$json = new Asset();
//$json->closeConnection();
echo $json->getAsset();