<?php

$myuser = $_GET['myuser'];


$servername = "localhost:3309";
$username = "root";
$password = "";
$dbname = "razbook";

$con = mysqli_connect($servername,$username,$password,$dbname);
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

mysqli_select_db($con,"razbook");
$sql="SELECT * FROM users WHERE username = '".$myuser."'";
$result = mysqli_query($con,$sql);


while($row = mysqli_fetch_array($result)) {
    echo '<img src="profileImages/'.$row['profile_photo'].'" alt="user" class="profile-photo" />';
}

?>