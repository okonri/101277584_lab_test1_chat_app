//Sign up section
$(() => {
    $("#send").click(() => {

        sendUserMongo({
            username: $("#username").val(),
            firstname: $("#firstname").val(),
            lastname: $("#lastname").val(),
            password: $("#password").val()
        })
    })

})

function sendUserMongo(user) {
    $.post('http://localhost:5000/user', user)
    window.location.href = 'signin.html'
}



//Sign in section

$(() => {
    $("#login").click(() => {

        $.get('http://localhost:5000/user', (data) => {
            data.map(addUsers);
        })
    })

})


function addUsers(user) {

    if ($("#username").val() == user.username && $("#password").val() == user.password) {

        localStorage.setItem('logedInUser', user.username)
        window.location.href = 'joinChat.html'
    } else {
        document.getElementById('messages').innerHTML = "Failed"
    }
}
