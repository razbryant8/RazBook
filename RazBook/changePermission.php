<?php
    $postId = $_GET['postId'];

    $servername = "localhost:3309";
    $username = "root";
    $password = "";
    $dbname = "razbook";

    $con = mysqli_connect($servername,$username,$password,$dbname);
    if (!$con) {
        die('Could not connect: ' . mysqli_error($con));
    }

    $sql = "SELECT post_permission FROM posts WHERE (post_id='$postId')";
    $res = mysqli_query($con, $sql);
    $row = mysqli_fetch_array($res);
    if($row[0]!=""){

        if($row[0] == 1) {
            $private_sql = "UPDATE posts SET post_permission = 0 WHERE (post_id='$postId')";
            $private_res_sql = mysqli_query($con, $private_sql);
            echo '<img src="images/private.png" alt="private">';
        }
        else{
            $public_sql = "UPDATE posts SET post_permission = 1 WHERE (post_id='$postId')";
            $public_res_sql = mysqli_query($con, $public_sql);
            echo '<img src="images/public.png" alt="private">';
        }


    }
    
    mysqli_close($con);

?>