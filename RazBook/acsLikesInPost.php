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

    $sql = "SELECT post_number_of_likes FROM posts WHERE (post_id='$postId')";
    $res = mysqli_query($con, $sql);
    $row = mysqli_fetch_array($res);
    if($row[0]!=""){
        
        $newNumOfLikes = $row[0]+1;
        
        $asc_sql = "UPDATE posts SET post_number_of_likes = $newNumOfLikes WHERE (post_id='$postId')";
        $res_sql = mysqli_query($con, $asc_sql);
        echo '<i class="icon ion-thumbsup"></i> '.$newNumOfLikes;

    }
    
    mysqli_close($con);

?>