<?php

$myuser = $_GET['myuser'];
$text = $_GET['text'];


function addPost($postText, $user, $likesNum = 0, $permmision = TRUE){
    $servername = "localhost:3309";
    $username = "root";
    $password = "";
    $dbname = "razbook";
    
    $conn = mysqli_connect($servername,$username,$password,$dbname);
    
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    
    $sql = "SELECT username FROM users WHERE (username='$user')";
    $res = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($res);
    
    
    if($row[0] != ""){
            
        if($permmision)
            $perNum = 1;
        else
            $perNum = 0;
            
        
        $sql = "INSERT INTO POSTS (post_username, post_permission, post_text, post_number_of_likes) VALUES ('$user','$perNum','$postText','$likesNum')";  
        $res = mysqli_query($conn, $sql);
        
        /*
        ///upload images in post
        $lastPostId = 'check';
    
        $errors= array();
        $expensions= array("jpeg","jpg","png","gif");
        $count = 1;
        $countfiles = count($_FILES['photosToPost']['name']);

        for($i=0;$i<$countfiles;$i++){
            $file_name = $_FILES['photosToPost']['name'][$i];
            $file_size =$_FILES['photosToPost']['size'][$i];
            $file_tmp =$_FILES['photosToPost']['tmp_name'][$i];
            $file_type=$_FILES['photosToPost']['type'][$i];
            $endi = explode('.',$_FILES['photosToPost']['name'][$i]);
            $file_ext=strtolower(end($endi));
    
            if(in_array($file_ext,$expensions)=== false){
                $errors[]="extension not allowed, please choose a JPEG, GIF or PNG  file.";
            }
            
            if(empty($errors)==true){
                $newPostPicName = 'PostId '.$lastPostId.' Image number .'.$count.'.'.$file_ext;
                $count = $count + 1;
                move_uploaded_file($file_tmp,"postsImages/".$newPostPicName);
                $post_image_sql = "INSERT INTO PHOTOS (post_id, photo_name) VALUES ('$lastPostId','$newPostPicName')";  
                $post_image_res = mysqli_query($conn, $post_image_sql);
            }else{
                print_r($errors);
            }
        }*/
        
    }
    
       
   mysqli_close($conn);
    
}

addPost($text, $myuser);
