<?php
    $servername = "localhost:3309";
    $username = "root";
    $password = "";
    $dbname = "razbook";

    $con = mysqli_connect($servername,$username,$password,$dbname);
    if (!$con) {
        die('Could not connect: ' . mysqli_error($con));
    }

    $searchText = $_POST['search'];
    if($searchText == "*"){
        $sql = "SELECT fullname,username FROM users order by fullname asc";
    }else{
        $sql = "SELECT fullname,username FROM users where fullname like '%".$searchText."%' order by fullname asc";
    }

    $result = mysqli_query($con,$sql);

    $search_arr = array();

    while($fetch = mysqli_fetch_assoc($result)){
        $fullname = $fetch['fullname'];
        $theuser = $fetch['username'];

        $search_arr[] = array("fullname" => $fullname, "username" => $theuser);
    }

    echo json_encode($search_arr);


?>