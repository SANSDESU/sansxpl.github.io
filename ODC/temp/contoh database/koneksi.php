<?php
// file koneksi.hp
$host = "localhost";
$username = "root";
$password = "";
$database = "db_odc";

return new PDO("mysql:host=$host;dbname=$database", $username, $password, array(
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
));