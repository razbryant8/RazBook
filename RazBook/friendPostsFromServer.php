
<?php




function getPosts(){
    $myuser = $_GET['myuser'];
    $myfriend = $_GET['friend'];

    $servername = "localhost:3309";
    $username = "root";
    $password = "";
    $dbname = "razbook";

    $con = mysqli_connect($servername,$username,$password,$dbname);
    if (!$con) {
        die('Could not connect: ' . mysqli_error($con));
    }

    mysqli_select_db($con,"razbook");


    $friend_sql = "SELECT * FROM friends WHERE (user1='$myuser' AND user2='$myfriend')";
    $friend_res = mysqli_query($con, $friend_sql);
    $friend_row = mysqli_fetch_array($friend_res);

    //if the friend in friend list
    if($friend_row[0] != ""){

        $sql="SELECT * FROM posts,users WHERE post_username = '".$myfriend."' AND post_permission=1  AND posts.post_username=users.username ORDER BY post_create_date DESC" ;
        $result = mysqli_query($con,$sql);

        while($row = mysqli_fetch_array($result)) {
            echo'<div class="post-content" id="post'.$row["post_id"].'">';
        //    echo '<img src="images/post-images/1.jpg" alt="post-image" class="img-responsive post-image" />';
            echo '<div class="post-container">';
            $com_sql_post_photo = 'SELECT profile_photo FROM users WHERE username="'.$myfriend.'"';
            $com_res_post_photo = mysqli_query($con, $com_sql_post_photo);
            $com_res_post_photo_chose = mysqli_fetch_array($com_res_post_photo);
            echo '<img src="profileImages/'.$com_res_post_photo_chose[0].'" alt="user" class="profile-photo-md pull-left" />';
            echo '<div class="post-detail">';
            echo '<div class="user-info">';
            echo '<h5><a href="friendfeed.html?myuser='.$myuser.'&friend='.$myfriend.'" class="profile-link">'.$row["fullname"].'</a></h5>';
            echo '<p class="text-muted">'.$row["post_create_date"].'</p></div>';
            echo '<div class="reaction">';
            echo '<a class="btn text-green" id="likes'.$row["post_id"].'" onclick="ascLikesInPost(this.id,'.$row["post_id"].')"><i class="icon ion-thumbsup"></i> '.$row["post_number_of_likes"].'</a>';
            echo '</div>';
            echo '<div class="line-divider"></div>';
            echo '<div class="post-text">';
            echo '<p>'.$row["post_text"].' </p></div>';
            echo '<div class="line-divider"></div>';
            
            // Comments
            $com_sql = 'SELECT * FROM comments,users WHERE post_id='.$row["post_id"].' AND comments.comment_username=users.username ORDER BY comment_date DESC';
            $com_res = mysqli_query($con, $com_sql);
            $com_allRes =  mysqli_fetch_all($com_res,MYSQLI_ASSOC);
            foreach ($com_allRes as $com_row) {
                echo '<div class="post-comment">';
                $com_sql_photo = 'SELECT profile_photo FROM users WHERE username="'.$com_row["comment_username"].'"';
                $com_res_photo = mysqli_query($con, $com_sql_photo);
                $com_res_photo_chose = mysqli_fetch_array($com_res_photo);
                echo '<img src="profileImages/'.$com_res_photo_chose[0].'" alt="" class="profile-photo-sm" />';
                if($com_row["comment_username"] === $myuser){
                    echo '<p><a href="userfeed.html?myuser='.$myuser.'" class="profile-link">'.$com_row["fullname"].' </a>'.$com_row["comment_text"].'</p>';
                }else{
                    echo '<p><a href="friendfeed.html?myuser='.$myuser.'&friend='.$com_row["comment_username"].'" class="profile-link">'.$com_row["fullname"].' </a>'.$com_row["comment_text"].'</p>';
                }
                echo '</div>';
            }
            
            // add comment
            echo '<div class="post-comment">';
            $addcom_sql_photo = 'SELECT profile_photo FROM users WHERE username="'.$myuser.'"';
            $addcom_res_photo = mysqli_query($con, $addcom_sql_photo);
            $addcom_res_photo_chose = mysqli_fetch_array($addcom_res_photo);
            echo '<img src="profileImages/'.$addcom_res_photo_chose[0].'" alt="" class="profile-photo-sm" />';
            $com_post_id = $row["post_id"];
        //    echo '<input type="text" action="POST" class="form-control" placeholder="Post a comment"  name="comment_txt'.$com_post_id.'" id="comment_txt'.$com_post_id.'">';
            echo '<div class="col-md-5 col-sm-5">';
            echo '<div class="tools">';
            echo '<input type="button" value="Add Comment" class="btn btn-primary pull-right" 
                    name="comment_btn'.$com_post_id.'" id="comment_btn'.$com_post_id.'"
                    onclick=commentPopUp("'.$com_post_id.'","'.$myuser.'")>';
                    
            echo '</div>';
            echo '</div>';
            echo '</div>';
            

            
            echo '</div>';
            echo '</div>';
            echo '</div>';
        }
    }
    else{
     //   $func = addFriend($con, $myuser,$myfriend);
        echo '<div><input type="button" value="Add Friend" class="btn btn-primary pull-right" 
            onclick=addFriend("'.$myuser.'","'.$myfriend.'");location.reload();></div>';
        getNumOfMutualFriends($con, $myuser,$myfriend);
    }

    mysqli_close($con);
}
/*
function addFriend($conn, $user1 ,$user2){
    $friend_table_sql = "INSERT INTO FRIENDS (user1, user2) VALUES ('$user1','$user2')";  
    $friend_table_res = mysqli_query($conn, $friend_table_sql);
    $friend_table_sql = "INSERT INTO FRIENDS (user1, user2) VALUES ('$user2','$user1')";  
    $friend_table_res = mysqli_query($conn, $friend_table_sql);
}*/

function getNumOfMutualFriends($conn, $user1 ,$user2){
    $sql = "SELECT count(*) 
            FROM (SELECT * FROM friends WHERE user1='$user1')f1, (SELECT * FROM friends WHERE user1='$user2') f2 
            WHERE f1.user2 = f2.user2";
    $res = mysqli_query($conn, $sql);
    $num = mysqli_fetch_array($res);
    echo 'You Have '.$num[0].' Mutual Friends With '.$user2;
}

getPosts();

?>