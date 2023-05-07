let user = new User(null,null,null,null);
let selectedUser = new User(null,null,null,null);
let users = new HashTable();
let messages = new BlockChain();
let inChat = false;
let inputmsg = document.getElementById("msgs");

//-----------------------------------------------------------
//--------------------INITIAL FUNCTION-----------------------
function welcomeUser(){
    if(localStorage.getItem('user') != null){
        user = JSON.retrocycle(JSON.parse(localStorage.getItem('user')));
        localStorage.removeItem('user');
        inChat = true;

        $('#welcomeusr').html(`Chatea con tus amigos, ${user.firstname}!`);
        showUsers();
        localMessages();
        console.log(messages);
    }else{
        alert("No se ha iniciado sesión");
        window.location.href = "index.html";
    }
}

//-----------------------------------------------------------
//-------------------SET LOCAL USERS-------------------------
function localUsers(){
    if (localStorage.getItem('users') == null) {
        return;
    }
    let localusers = JSON.retrocycle(JSON.parse(localStorage.getItem('users')));
    users.table = localusers.table;
    users.size = localusers.size;
    users.capacity = localusers.capacity;
}

//-----------------------------------------------------------
//-------------------SET LOCAL MESSAGES----------------------
function localMessages(){
    if (localStorage.getItem('messages') != null) {
        let localmessages = JSON.retrocycle(JSON.parse(localStorage.getItem('messages')));
        messages.head = localmessages.head;
        messages.tail = localmessages.tail;
        messages.size = localmessages.size;
    }
}

//-----------------------------------------------------------
//-------------------SHOW USERS IN HTML----------------------
function showUsers(){
    localUsers();
    $('#userslist').html(users.getUsersChatHtml(user.carnet));
}

function closeChat(){
    inChat = false;
    window.top.close();
}

window.addEventListener("beforeunload", function (e) {
    if(inChat){
        localStorage.setItem('user', JSON.stringify(JSON.decycle(user)));
    }
});

//-----------------------------------------------------------
//--------------------SHOW MESSAGES--------------------------
function showMessages(){
    localMessages();
    $('#chatcontainer').html(messages.getMessages(user.carnet, selectedUser.carnet));
}

//-----------------------------------------------------------
//--------------------SELECT USER----------------------------
function selectUser(carnet){
    let userslst = $('#userslst').children();
    userslst.removeClass('active');

    selectedUser = users.getUser(carnet);
    let select = $(`#${carnet}`);
    select.addClass('active');
    showMessages();
}

//-----------------------------------------------------------
//--------------------SEND MESSAGE---------------------------
async function sendMessage(){
    
    if(selectedUser.carnet != null){
        let msg = $('#msgs').val();
        localMessages();
        await messages.insert(user.carnet, selectedUser.carnet, msg);
        $('#msgs').val("");
        localStorage.setItem('messages', JSON.stringify(JSON.decycle(messages)));
        showMessages();
        $('#chatcontainer').scrollTop($('#chatcontainer')[0].scrollHeight);
    }else{
        alert("Seleccione un amigo para chatear");
        $('#msgs').blur();
    }
}

//-----------------------------------------------------------
//--------------------REFRESH MESSAGES-----------------------
const refreshMessages = setInterval(showMessages, 1000);

//-----------------------------------------------------------
//--------------------EVENT LISTENERS------------------------

inputmsg.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
});

$(document).ready(welcomeUser)