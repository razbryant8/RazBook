<?php
function login(){
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

    
    $sql = "SELECT username,password FROM users WHERE (username='$username')";
    $res = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($res);
    $c_pass = CalculatePassword($password);
    
    if($row[0] != ""){
        
        if($c_pass === $row[1]){
            header("Location: userfeed.html?myuser=".$row[0]);
        }
        else
        header("Location: http://localhost:8080/RazBook/loginPage.html");
        
    }
    else
        header("Location: http://localhost:8080/RazBook/loginPage.html");
            
            
    mysqli_close($conn);
}

/* Returns the encrypted password of the given string. */
function CalculatePassword($pass) {
    $pass=$pass[0].$pass.$pass[0]; // 12345-->123455
    $pass=md5($pass);
    return $pass;
}

if(isset($_POST["loginSubmit"])){
    login();
}

?>