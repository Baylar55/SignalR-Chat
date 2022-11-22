"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
connection.start().then(function () {
    if (localStorage.getItem('user')) {
        ShowChatSection();
    }
}).catch(function (err) {
    return console.error(err.toString());
});

const joinGroupForm = document.getElementById('joinGroupForm');
const joinGroupSection = document.getElementById('joinGroupSection');
const chatSection = document.getElementById('chatSection');
const leaveGroupBtn = document.getElementById('leaveGroupBtn');
const sendMessageForm = document.getElementById('sendMessageForm');


joinGroupForm.addEventListener("submit", function (element) {
    element.preventDefault();

    var user = {
        name: document.getElementById('username').value,
        group: document.getElementById('group').value
    }

    connection.invoke("AddToGroup", user.group).catch(function (err) {
        return console.error(err.toString());
    });

    localStorage.setItem('user', JSON.stringify(user));

    ShowChatSection();
})

leaveGroupBtn.addEventListener("click", function () {
    var user = JSON.parse(localStorage.getItem('user'));

    connection.invoke("RemoveFromGroup", user.group).catch(function (err) {
        return console.error(err.toString());
    });

    localStorage.removeItem('user');

    ShowJoinGroupSection();
})

sendMessageForm.addEventListener("submit", function (element) {
    element.preventDefault();

    var user = JSON.parse(localStorage.getItem('user'));
    var message = document.getElementById('message').value;

    connection.invoke("SendMessage", user.name, user.group, message).catch(function (err) {
        return console.error(err.toString());
    });
    document.getElementById('message').value = '';
})

connection.on("ReceiveMessage", function (username, message) {
    var li = `<li class="list-group-item">
                    <b>${username}</b>
                    <p>${message}</p>
                </li>`
    document.getElementById("messages").insertAdjacentHTML("beforeend", li)

});

function ShowChatSection() {
    joinGroupSection.classList.add("d-none");
    chatSection.classList.remove("d-none");
}

function ShowJoinGroupSection() {
    chatSection.classList.add("d-none");
    joinGroupSection.classList.remove("d-none");
}

