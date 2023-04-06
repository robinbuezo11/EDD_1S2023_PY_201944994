let user = new User(null,null,null,null);
let folders = new NAryTree();

function welcomeUser(){
    if(localStorage.getItem('user') != null){
        user = JSON.parse(localStorage.getItem('user'));
        folders.root = user.folders.root;
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

function newFolder(e){
    e.preventDefault();
    let folderName = $('#folderName').val();
    let folderPath = $('#path').val();
    folders.insert(folderName, folderPath);
    alert("Carpeta creada con éxito");
    user.folders = folders;
    localStorage.setItem('user', JSON.stringify(user));
    console.log(folders);
    $('#folders').html(folders.getHtml(folderPath));
}

function insideFolder(folderPath){
    let path = $('#path').val();
    let currentPath = path  == '/' ? path + folderPath : path + '/' + folderPath;
    console.log(currentPath);
    $('#path').val(currentPath);
    $('#folders').html(user.folders.getHtml(currentPath));
}

function backRoot(){
    $('#path').val('/');
    $('#folders').html(user.folders.getHtml('/'));
}

function showTreeGraph(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { ${user.folders.graph()} }`;
    $('#graph').attr('src', url + body);
}

/* const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
}); */

$(document).ready(welcomeUser)