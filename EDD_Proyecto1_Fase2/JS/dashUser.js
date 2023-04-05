let user = new User(null,null,null,null);

function welcomeUser(){
    if(localStorage.getItem('user') != null){
        user = JSON.parse(localStorage.getItem('user'));
        $('#welcomeusr').html('¡Bienvenido ' + user.firstname + ' ' + user.lastname + '!');
    }else{
        alert("No se ha iniciado sesión");
        window.location.href = "index.html";
    }
}

function logoutUser(){
    if(confirm("¿Está seguro que desea cerrar sesión?")){
        localStorage.removeItem('user');
        window.location.href = "index.html";
    }
}

$(document).ready(welcomeUser)