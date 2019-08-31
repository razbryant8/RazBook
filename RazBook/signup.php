<?php

if(isset($_POST["SignUpSubmit"])){
    $servername = "localhost:3309";
    $username = "root";
    $password = "";
    $dbname = "razbook";
    
    $conn = mysqli_connect($servername,$username,$password,$dbname);
    
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    
    $username = mysqli_real_escape_string($conn, $_POST["username"]);
    $password = mysqli_real_escape_string($conn, $_POST["password"]);
    $birthday = mysqli_real_escape_string($conn, $_POST["birthday"]);
    $fullname = mysqli_real_escape_string($conn, $_POST["fullname"]);

    if($_FILES["profilePhoto"]["error"] > 0){
        echo "Error: " . $_FILES["profilePhoto"]["error"] . "<br>";
    } else{
        echo "File Name: " . $_FILES["profilePhoto"]["name"] . "<br>";
        echo "File Type: " . $_FILES["profilePhoto"]["type"] . "<br>";
        echo "File Size: " . ($_FILES["profilePhoto"]["size"] / 1024) . " KB<br>";
        echo "Stored in: " . $_FILES["profilePhoto"]["tmp_name"];
    }

    /// UPLOAD IMAGE
    if(isset($_FILES['profilePhoto'])){
        $errors= array();
        $file_name = $_FILES['profilePhoto']['name'];
        $file_size =$_FILES['profilePhoto']['size'];
        $file_tmp =$_FILES['profilePhoto']['tmp_name'];
        $file_type=$_FILES['profilePhoto']['type'];
        $endi = explode('.',$_FILES['profilePhoto']['name']);
        $file_ext=strtolower(end($endi));

        $expensions= array("jpeg","jpg","png","gif");
        if(in_array($file_ext,$expensions)=== false){
            $errors[]="extension not allowed, please choose a JPEG, GIF or PNG  file.";
         }
         
         if(empty($errors)==true){
             $newProfilePicName = $username.'.'.$file_ext;
            move_uploaded_file($file_tmp,"profileImages/".$newProfilePicName);
            echo "Success<br>";
         }else{
            print_r($errors);
         }

    }


    
    $enc_pass = CalculatePassword($password);
        
    $sql = "INSERT INTO USERS (username, password, birthday, fullname, profile_photo) VALUES ('$username','$enc_pass','$birthday','$fullname','$newProfilePicName')";
    $res = mysqli_query($conn, $sql);

    if($res === TRUE)
        header("Location: userfeed.html?myuser=".$username);
    
        
    mysqli_close($conn);
}

/* Returns the encrypted password of the given string. */
function CalculatePassword($pass) {
    $pass=$pass[0].$pass.$pass[0]; // 12345-->123455
    $pass=md5($pass);
    return $pass;
}

?>