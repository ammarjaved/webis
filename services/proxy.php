<?php
$arrContextOptions=array(
    "ssl"=>array(
        "verify_peer"=>false,
        "verify_peer_name"=>false,
    ),
);
$url=$_GET["url"];
$response = file_get_contents($url, false, stream_context_create($arrContextOptions));

echo $response;



//$res = file_get_contents($url);
//echo $res;


?>