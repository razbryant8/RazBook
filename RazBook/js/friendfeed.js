function showUserName(myuser, friendUserName) {

    if (friendUserName == "") {
        document.getElementById("userHeader").innerHTML = "";
        return;
    } else {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("userHeader").innerHTML = this.responseText;
            }
        };
        xmlhttp.open("POST", "friendUserNameFromServer.php?myuser=" + myuser + "&friend=" + friendUserName, true);
        xmlhttp.send();
    }
}

function showMyAvatar(myuser) {

    if (myuser == "") {
        document.getElementById("myAvatar").innerHTML = "";
        return;
    } else {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("myAvatar").innerHTML = this.responseText;
            }
        };
        xmlhttp.open("POST", "myAvatar.php?myuser=" + myuser, true);
        xmlhttp.send();
    }
}


function showUserPosts(myuser, friendUserName) {

    if (friendUserName == "") {
        document.getElementById("FriendPostsFromServer").innerHTML = "";
        return;
    } else {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("FriendPostsFromServer").innerHTML = this.responseText;
            }
        };
        xmlhttp.open("POST", "friendPostsFromServer.php?myuser=" + myuser + "&friend=" + friendUserName, true);
        xmlhttp.send();
    }
}

function commentPopUp(postId, userName) {
    var txt;
    var comment = prompt("Please enter your comment:");
    if (comment == null || comment == "") {
        alert("You don't post any comment");
    } else {
        txt = comment;
        addComment(postId, userName, txt);
        location.reload();
    }
}



function addComment(postId, userName, text) {
    if (userName == "") {
        //      document.getElementById("PostsFromServer").innerHTML = document.getElementById("PostsFromServer").innerHTML;
        return;
    } else {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                //   document.getElementById("PostsFromServer").innerHTML = document.getElementById("PostsFromServer").innerHTML;
            }
        };
        xmlhttp.open("PUT", "addComment.php?postId=" + postId + "&myuser=" + userName + "&text=" + str_replace(" ", "%20", text), true);
        xmlhttp.send();
    }
}

function addFriend(user1, user2) {
    if (user1 == "") {
        //      document.getElementById("PostsFromServer").innerHTML = document.getElementById("PostsFromServer").innerHTML;
        return;
    } else {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                //   document.getElementById("PostsFromServer").innerHTML = document.getElementById("PostsFromServer").innerHTML;
            }
        };
        xmlhttp.open("PUT", "addFriend.php?user1=" + user1 + "&user2=" + user2);
        xmlhttp.send();
    }
}


function ascLikesInPost(buttonId, postId) {

    if (buttonId == "") {
        document.getElementById(buttonId).innerHTML = "";
        return;
    } else {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById(buttonId).innerHTML = this.responseText;
            }
        };
        xmlhttp.open("PUT", "acsLikesInPost.php?postId=" + postId, true);
        xmlhttp.send();
    }
}

function str_replace(token, rep, text) {
    return text.split(token).join(rep);
}


function cutString(text, whatToReplace) {
    return text.replace(whatToReplace, "");
}

function getAllUrlParams(url) {

    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

    // we'll store the parameters here
    var obj = {};

    // if query string exists
    if (queryString) {

        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split('#')[0];

        // split our query string into its component parts
        var arr = queryString.split('&');

        for (var i = 0; i < arr.length; i++) {
            // separate the keys and the values
            var a = arr[i].split('=');

            // set parameter name and value (use 'true' if empty)
            var paramName = a[0];
            var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

            // (optional) keep case consistent
            paramName = paramName.toLowerCase();
            if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

            // if the paramName ends with square brackets, e.g. colors[] or colors[2]
            if (paramName.match(/\[(\d+)?\]$/)) {

                // create key if it doesn't exist
                var key = paramName.replace(/\[(\d+)?\]/, '');
                if (!obj[key]) obj[key] = [];

                // if it's an indexed array e.g. colors[2]
                if (paramName.match(/\[\d+\]$/)) {
                    // get the index value and add the entry at the appropriate position
                    var index = /\[(\d+)\]/.exec(paramName)[1];
                    obj[key][index] = paramValue;
                } else {
                    // otherwise add the value to the end of the array
                    obj[key].push(paramValue);
                }
            } else {
                // we're dealing with a string
                if (!obj[paramName]) {
                    // if it doesn't exist, create property
                    obj[paramName] = paramValue;
                } else if (obj[paramName] && typeof obj[paramName] === 'string') {
                    // if property does exist and it's a string, convert it to an array
                    obj[paramName] = [obj[paramName]];
                    obj[paramName].push(paramValue);
                } else {
                    // otherwise add the property
                    obj[paramName].push(paramValue);
                }
            }
        }
    }

    return obj;
}

function homePage(user) {
    window.location.href = "userfeed.html?myuser=" + user;
}

function goToLogin() {
    window.location.href = "loginPage.html";
}