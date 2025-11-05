<?php
header("Access-Control-Allow-Origin: *"); // Allow all origins (you can restrict this)
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
$host="localhost";
$dbname="world_x";
$user="root";
$pass="";
try{
    $conn = new PDO("mysql:host=$host;dbname=$dbname",$user,$pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e){
    die($e->getMessage());
}
$sql="SELECT * from country";
$statement = $conn->prepare($sql);
$statement->execute();
$countries = $statement->fetchAll(PDO::FETCH_ASSOC);
$data=[];

echo json_encode($countries);

