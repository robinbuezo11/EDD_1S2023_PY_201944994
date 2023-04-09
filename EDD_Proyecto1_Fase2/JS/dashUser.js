let user = new User(null,null,null,null);
let folders = new NAryTree();
let files = new SparseMatrix();
let binnacle = new CircularList();

//-----------------------------------------------------------
//--------------------INITIAL FUNCTION-----------------------
function welcomeUser(){
    if(localStorage.getItem('user') != null){
        user = JSON.retrocycle(JSON.parse(localStorage.getItem('user')));
        folders.root = user.folders.root;
        folders.size = user.folders.size;
        binnacle.root = user.binnacle.root;
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
    files.root = folders.getFolder(folderPath).files.root;
    $('#folders').html(folders.getHtml(folderPath));
}

//-----------------------------------------------------------
//--------------------------LOGOUT---------------------------
function logoutUser(){
    if(confirm("¿Está seguro que desea cerrar sesión?")){
        saveUser();
        localStorage.removeItem('user');
        if(localStorage.getItem('path') != null){
            localStorage.removeItem('path');
        }
        window.location.href = "index.html";
    }
}

//-----------------------------------------------------------
//------------------CREATE A NEW FOLDER----------------------
function newFolder(e){
    e.preventDefault();
    let folderName = $('#folderName').val();
    let folderPath = $('#path').val();
    if(folderName == ''){
        alert("Ingrese un nombre para la carpeta");
        return;
    }
    //console.log(folderName);
    if(folders.insert(folderName, folderPath)){
        alert("Carpeta creada con éxito");
        user.folders.root = folders.root;
        user.folders.size = folders.size;

        //INSERT ACTION IN THE BINNACLE
        binnacle.insert("Acción: Se creó la carpeta \"" + folderName + "\"\n" + getTime());
        user.binnacle.root = binnacle.root;
        

        localStorage.setItem('user', JSON.stringify(JSON.decycle(user)));
        //console.log(folders);
        showFolders();
        saveUser();
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
//---------------------SHOW GRAPH FOLDERS--------------------
function openGraphFolders(){
    let windows = window.open("FoldersGraph.html", "_blank");
    windows.focus();
}

//-----------------------------------------------------------
//---------------------SHOW GRAPH FILES----------------------
function openGraphFiles(){
    localStorage.setItem('path', JSON.stringify($('#path').val()));
    let windows = window.open("FilesGraph.html", "_blank");
    windows.focus();
}


//-----------------------------------------------------------
//----------------------DELETE FOLDER------------------------
function deleteFolder(){
    let folder = $('#path').val();
    if(confirm("¿Está seguro que desea eliminar la carpeta " + folder + "?")){
        if(folders.delete(folder)){
            user.folders.root = folders.root;
            user.folders.size = folders.size;
            
            //INSERT ACTION IN THE BINNACLE
            binnacle.insert("Acción: Se eliminó la carpeta \"" + folder.substring(folder.lastIndexOf+1) + "\"\n" + getTime());
            user.binnacle.root = binnacle.root;
            
            localStorage.setItem('user', JSON.stringify(JSON.decycle(user)));
            alert("Carpeta eliminada con éxito");
            if(folder.lastIndexOf('/') == 0){
                $('#path').val('/');
            }else{
                $('#path').val(folder.substring(0, folder.lastIndexOf('/')));
            }
            showFolders();
            saveUser();
        }
    }
}

//-----------------------------------------------------------
//----------------SAVE USER IN AVLTREE-----------------------
function saveUser(){
    let users = new AvlTree();
    if(localStorage.getItem('users') != null){
        users.root = JSON.retrocycle(JSON.parse(localStorage.getItem('users'))).root;
    }
    if(users.setUser(user)){
        localStorage.setItem('users', JSON.stringify(JSON.decycle(users)));
    }else{
        console.log("No se pudo guardar el usuario");
    }
}

//-----------------------------------------------------------
//----------------------PARSE TO BASE64----------------------
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

//-----------------------------------------------------------
//---------------------INSERT FILE---------------------------
const uploadFile = async (e) => {
    e.preventDefault();
    if($('#file').val() == ''){
        alert("Seleccione un archivo");
        return;
    }
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    let path = $('#path').val();
    //console.log(form.file)
    let parseBase64 = await toBase64(form.file);
    
    //The files are saved now in the SparseMatrix
    /* folders.getFolder(path).files.push({
        name: form.file.name.substring(0, form.file.name.lastIndexOf('.')),
        content: parseBase64, 
        type: form.file.type
    }); */

    files.insert(user.carnet,form.file.name,'r-w',form.file.name.substring(0, form.file.name.lastIndexOf('.')),parseBase64,form.file.type);
    
    folders.getFolder(path).files.root = files.root;
    user.folders.root = folders.root;
    user.folders.size = folders.size;

    //INSERT ACTION IN THE BINNACLE
    binnacle.insert("Acción: Se creo el archivo \"" + form.file.name +"\"\n" + getTime());
    user.binnacle.root = binnacle.root;
    
    localStorage.setItem('user', JSON.stringify(JSON.decycle(user)));
    showFolders();
    saveUser();

    $('#file').val('');
}

//-----------------------------------------------------------
//---------------------GET CURRENT TIME----------------------
function getTime(){
    let date = new Date();
    let datestr = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    datestr += "-";
    datestr += (date.getMonth()+1) < 10 ? "0" + (date.getMonth()+1) : (date.getMonth()+1);
    datestr += "-" + (date.getFullYear()-2000);
    let timestr = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(); 
    timestr += ":";
    timestr += date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    return "Fecha: " + datestr + "\nHora: " + timestr;
}

$(document).ready(welcomeUser)