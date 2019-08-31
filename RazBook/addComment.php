<?php

$postId = $_GET['postId'];
$myuser = $_GET['myuser'];
$text = $_GET['text'];


$servername = "localhost:3309";
$username = "root";
$password = "";
$dbname = "razbook";

$conn = mysqli_connect($servername,$username,$password,$dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT post_id FROM posts WHERE (post_id='$postId')";
$res = mysqli_query($conn, $sql);
$row = mysqli_fetch_array($res);


if($row[0] != ""){
    $sql = "INSERT INTO COMMENTS (post_id, comment_username, comment_text) VALUES ('$postId','$myuser','$text')";  
    $res = mysqli_query($conn, $sql);
        
}  
    
mysqli_close($conn);
