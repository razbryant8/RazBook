
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
$sql="SELECT * FROM posts,users WHERE post_username = '".$myuser."' AND posts.post_username=users.username ORDER BY post_create_date DESC";
$result = mysqli_query($con,$sql);

while($row = mysqli_fetch_array($result)) {
    echo'<div class="post-content">';
   //    echo '<img src="images/post-images/1.jpg" alt="post-image" class="img-responsive post-image" />';
    echo '<div class="post-container">';
    $com_sql_post_photo = 'SELECT profile_photo FROM users WHERE username="'.$myuser.'"';
    $com_res_post_photo = mysqli_query($con, $com_sql_post_photo);
    $com_res_post_photo_chose = mysqli_fetch_array($com_res_post_photo);
    echo '<img src="profileImages/'.$com_res_post_photo_chose[0].'" alt="user" class="profile-photo-md pull-left" />';
    echo '<div class="post-detail">';
    echo '<div class="user-info">';
    echo '<h5><a href="userfeed.html?myuser='.$row["post_username"].'" class="profile-link">'.$row["fullname"].'</a></h5>';
    echo '<p class="text-muted">'.$row["post_create_date"].'</p></div>';
    echo '<div class="reaction">';
    echo '<a class="btn text-green" id="likes'.$row["post_id"].'" onclick="ascLikesInPost(this.id,'.$row["post_id"].')"><i class="icon ion-thumbsup"></i> '.$row["post_number_of_likes"].'</a>';
    //permission btn
    if($row["post_permission"] == 1){
        echo '<a class="btn text-green" id="per'.$row["post_id"].'" onclick="changePermission(this.id,'.$row["post_id"].')"><img src="images/public.png" alt="public"></a>';
    }
    else{
        echo '<a class="btn text-red" id="per'.$row["post_id"].'" onclick="changePermission(this.id,'.$row["post_id"].')"><img src="images/private.png" alt="private"></a>';
    }

    echo '</div>';
    echo '<div class="line-divider"></div>';
    echo '<div class="post-text">';
    echo '<p>'.$row["post_text"].' </p></div>';
    echo '<div class="line-divider"></div>';
    
    // Comments
    $com_sql = 'SELECT * FROM comments,users WHERE post_id="'.$row["post_id"].'" AND comments.comment_username=users.username ORDER BY comment_date DESC';
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
        }           echo '</div>';
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

mysqli_close($con);
?>