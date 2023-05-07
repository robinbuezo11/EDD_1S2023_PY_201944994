let users = new HashTable();    // Now users is a HashTable object
let usersAvl = new AvlTree();   // Now AvlTree is usersAvl

//-----------------------------------------------------------
//-----------------------USERS UPLOAD------------------------
function loadUsersForm(e){
    e.preventDefault();
    if($('#inputFile').val() == ''){
        alert("No se ha seleccionado ningún archivo");
        return;
    }
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    let usersArray = [];
    try{
        let reader = new FileReader();
        reader.readAsText(form.inputFile)
        reader.onload = () => {
            usersArray = JSON.parse(reader.result).alumnos;

            //INSERT USERS IN THE TREE
            for(let i=0; i<usersArray.length; i++){
                let name = usersArray[i].nombre.trim().split(" ");
                usersAvl.Insert(new User(name[0], name[1], usersArray[i].carnet, usersArray[i].password));
            }

            //SAVE TREE IN LOCAL STORAGE
            //localStorage.setItem('users', JSON.stringify(JSON.decycle(users)));

            /* $('#usersTable tbody').html(
                users.inOrder()
            );
            $('#routes').val('inOrder'); */

            //----------------------NEW CODE PHASE 3----------------------

            let us = usersAvl.getUsersInOrder();
            for(let i=0; i<us.length; i++){
                let pass = CryptoJS.AES.encrypt(us[i].pass, 'P@$$w0rd').toString();
                us[i].pass = pass;
                users.insert(us[i]);
            }

            //SAVE HASH TABLE IN LOCAL STORAGE
            localStorage.setItem('users', JSON.stringify(JSON.decycle(users)));

            $('#usersTable tbody').html(
                users.getUsersHtml()
            );

            alert("¡Usuarios cargados correctamente!");
        }
        $('#inputFile').val('');
    }catch(error){
        console.log(error);
        alert("Error en la inserción de Usuarios")
    }
}

//-----------------------------------------------------------
//--------------LOAD USERS IN LOCAL STORAGE------------------
function loadLocalUsers(){
    if (localStorage.getItem('users') == null) {
        return;
    }
    let localusers = JSON.retrocycle(JSON.parse(localStorage.getItem('users')));
    users.table = localusers.table;
    users.size = localusers.size;
    users.capacity = localusers.capacity;
}

function loadLocalShares(){
    if (localStorage.getItem('shares') == null) {
        return '';
    }
    let localshares = JSON.retrocycle(JSON.parse(localStorage.getItem('shares')));
    let html = '';
    localshares.forEach(share => {
        let download = share.file.type == 'text/plain' ? share.file.name + '.txt' : share.file.name;
        let name = '';
        switch(share.file.type){
            case 'text/plain':
                name = share.file.name + '.txt';
                break;
            case 'application/pdf':
                name = share.file.name + '.pdf';
                break;
            case 'image/png':
                name = share.file.name + '.png';
                break;
            case 'image/jpeg':
                name = share.file.name + '.jpg';
                break;
        }

        html += `<tr>
                    <td>${share.owner}</td>
                    <td>${share.user}</td>
                    <td>${share.location}</td>
                    <td>
                        <a id="resource" href="${share.file.value}" download="${download}">
                            ${name}
                        </a>
                    </td>
                    <td>${share.perms}</td>
                </tr>`;
    });
    return html;
}

//-----------------------------------------------------------
//----------------------GENERATE ROUTES----------------------
/* function showUsersForm(e){
    loadLocalUsers();
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    if(users.root != null){
        switch(form.routes){
            case 'inOrder':
                $('#usersTable tbody').html(
                    users.inOrder()
                );
                break;
            case 'preOrder':
                $('#usersTable tbody').html(
                    users.preOrder()
                );
                break;
            case 'postOrder':
                $('#usersTable tbody').html(
                    users.postOrder()
                );
                break;
            default:
                $('#usersTable tbody').html('');
                break;
            }
    }
} */

//-----------------------------------------------------------
//----------------------SHOW GRAPH---------------------------
/* function openGraph(){
    let windows = window.open("UserGraph.html", "_blank");
    windows.focus();
} */

//-----------------------------------------------------------
//----------------------SHOW BINNACLE---------------------------
/* function showBinnacle(carnet){
    let user = users.getUser(carnet);
    if(user){
        localStorage.setItem('userbin', JSON.stringify(JSON.decycle(user)));
        let windows = window.open("BinnacleGraph.html", "_blank");
        windows.focus();
    }
} */

//-----------------------------------------------------------
//----------------------SHOW MESSAGES------------------------
function openMessagesRpt(){
    window.open("AdminMessages.html", "_blank");
}

//-----------------------------------------------------------
//----------------------CLEAR USERS--------------------------
function clearUsers(){
    if(confirm("¿Está seguro de eliminar todos los usuarios?")){
        
        //CLEAR USERS
        if (localStorage.getItem('users') != null) {
            localStorage.removeItem('users');
        }
        if(users.size > 0){
            //users = new AvlTree();
            users = new HashTable();
        }
        if(usersAvl.root != null){
            usersAvl = new AvlTree();
        }
        $('#usersTable tbody').html('');

        //CLEAR SHARES
        if (localStorage.getItem('shares') != null) {
            localStorage.removeItem('shares');
        }
        $('#sharesTable tbody').html('');

        //CLEAR MESSAGES
        if (localStorage.getItem('messages') != null) {
            localStorage.removeItem('messages');
        }

/*         let routesform = document.getElementById('routesform');
        routesform.reset() */
    }
}

//-----------------------------------------------------------
//-----------------SHOW LOCAL USERS IN THE TABLE-------------
function showLocalResources(){
    loadLocalUsers();
    let shares = loadLocalShares();
    if(users.size > 0){
        $('#usersTable tbody').html(
            //users.inOrder()
            users.getUsersHtml()
        );
        //$('#routes').val('inOrder');
    }

    if(shares != ''){
        $('#sharesTable tbody').html(shares);
    }
}

//-----------------------------------------------------------
//--------------------------LOGOUT---------------------------
function logoutAdmin(){
    if(confirm("¿Está seguro que desea cerrar sesión?")){
        if(localStorage.getItem('userbin') != null){
            localStorage.removeItem('userbin');
        }
        window.location.href = "index.html";
    }
}

$(document).ready(showLocalResources);