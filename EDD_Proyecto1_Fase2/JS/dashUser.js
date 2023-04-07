let user = new User(null,null,null,null);
let folders = new NAryTree();

//-----------------------------------------------------------
//--------------------INITIAL FUNCTION-----------------------
function welcomeUser(){
    if(localStorage.getItem('user') != null){
        user = JSON.parse(localStorage.getItem('user'));
        folders.root = user.folders.root;
        $('#welcomeusr').html('¡Bienvenido ' + user.firstname + ' ' + user.lastname + '!');
        showFolders();

    }else{
        alert("No se ha iniciado sesión");
        window.location.href = "index.html";
    }
}

//-----------------------------------------------------------
//-----------------------SHOW FOLDERS------------------------
function showFolders(){
    let folderPath = $('#path').val();
    $('#folders').html(folders.getHtml(folderPath));
}

//-----------------------------------------------------------
//--------------------------LOGOUT---------------------------
function logoutUser(){
    if(confirm("¿Está seguro que desea cerrar sesión?")){
        saveUser();
        localStorage.removeItem('user');
        window.location.href = "index.html";
    }
}

//-----------------------------------------------------------
//------------------CREATE A NEW FOLDER----------------------
function newFolder(e){
    e.preventDefault();
    let folderName = $('#folderName').val();
    let folderPath = $('#path').val();
    if(folders.insert(folderName, folderPath) && folderName != ''){
        alert("Carpeta creada con éxito");
        user.folders.root = folders.root;
        localStorage.setItem('user', JSON.stringify(user));
        //console.log(folders);
        saveUser();
        showFolders();
    }
    $('#folderName').val('');
}

//-----------------------------------------------------------
//---------------GO TO INSIDE TO THE FOLDER------------------
function insideFolder(folderPath){
    let path = $('#path').val();
    let currentPath = path  == '/' ? path + folderPath : path + '/' + folderPath;
    //console.log(currentPath);
    $('#path').val(currentPath);
    showFolders();
}

//-----------------------------------------------------------
//-------------------BACK TO ROOT FOLDER---------------------
function backRoot(){
    $('#path').val('/');
    showFolders();
}

//-----------------------------------------------------------
//----------------------SHOW GRAPH---------------------------
function openGraph(){
    let windows = window.open("FoldersGraph.html", "_blank");
    windows.focus();
}


//-----------------------------------------------------------
//----------------------DELETE FOLDER------------------------
function deleteFolder(){
    let folder = $('#path').val();
    if(confirm("¿Está seguro que desea eliminar la carpeta " + folder + "?")){
        if(folders.delete(folder)){
            user.folders.root = folders.root;
            localStorage.setItem('user', JSON.stringify(user));
            alert("Carpeta eliminada con éxito");
            if(folder.lastIndexOf('/') == 0){
                $('#path').val('/');
            }else{
                $('#path').val(folder.substring(0, folder.lastIndexOf('/')));
            }
            saveUser();
            showFolders();
        }
    }
}

function saveUser(){
    let users = new AvlTree();
    if(localStorage.getItem('users') != null){
        users.root = JSON.parse(localStorage.getItem('users')).root;
    }
    if(users.setUser(user)){
        localStorage.setItem('users', JSON.stringify(users));
    }else{
        console.log("No se pudo guardar el usuario");
    }
}

/* const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
}); */

$(document).ready(welcomeUser)