function getGithubInfo(user) {
    //1. Create an instance of XMLHttpRequest class and send a GET request using it.
    // The function should finally return the object(it now contains the response!)
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://api.github.com/users/" + user, false);
    xhttp.send();
    return xhttp;
}

function showUser(user) {
    //2. set the contents of the h2 and the two div elements in the div '#profile' with the user content
    $("#image").html("<img height='150' width='150' src='" + user.avatar_url + "'/>");
    $("#name").text("Name: " + user.name);
    $("#user_name").text("Username: " + user.login);
    $("#user_id").text("User Id: " + user.id);
    $("#user_followers").text("Followers: " + user.followers);
    $("#user_following").text("Following: " + user.following);
    $("#user_url").html("<a href='"+user.html_url+"' target='_blank'>GitHub account link</a>");
}

function noSuchUser(username) {
    //3. set the elements such that a suitable message is displayed
    alert("User " + username + " not match!!!");
}

$(document).ready(function () {
    $(document).on('keypress',  '#username', function (e) {
        //check if the enter(i.e return) key is pressed
        if (e.which == 13) {
            //get what the user enters
            username = $(this).val();
            //reset the text typed in the input
            $(this).val("");
            //get the user's information and store the respsonse
            response = getGithubInfo(username);
            //if the response is successful show the user's details
            if (response.status == 200) {
                showUser(JSON.parse(response.responseText));
                //else display suitable message
            } else {
                noSuchUser(username);
            }
        }
    })
});