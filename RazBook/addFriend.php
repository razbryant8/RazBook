<?php
    
    $user1 = $_GET['user1'];
    $user2 = $_GET['user2'];

    $servername = "localhost:3309";
    $username = "root";
    $password = "";
    $dbname = "razbook";
    
    $conn = mysqli_connect($servername,$username,$password,$dbname);
    
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    
    
        
    $friend_table_sql = "INSERT INTO FRIENDS (user1, user2) VALUES ('$user1','$user2')";  
    $friend_table_res = mysqli_query($conn, $friend_table_sql);
    $friend_table_sql = "INSERT INTO FRIENDS (user1, user2) VALUES ('$user2','$user1')";  
    $friend_table_res = mysqli_query($conn, $friend_table_sql);

    
        
    mysqli_close($conn);

?>