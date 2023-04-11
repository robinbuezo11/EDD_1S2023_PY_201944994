let users = new AvlTree();

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
                users.Insert(new User(name[0], name[1], usersArray[i].carnet, usersArray[i].password));
            }

            //SAVE TREE IN LOCAL STORAGE
            localStorage.setItem('users', JSON.stringify(JSON.decycle(users)));

            //INSERT USERS IN THE TABLE
            /* $('#usersTable tbody').html(
                usersArray.map((user, index) => {
                    return(`
                        <tr>
                            <td>${user.carnet}</td>
                            <td>${user.nombre}</td>
                            <td>${user.password}</td>
                        </tr>
                    `);
                }).join('') 
            ); */
            $('#usersTable tbody').html(
                users.inOrder()
            );
            $('#routes').val('inOrder');

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
    users.root = JSON.retrocycle(JSON.parse(localStorage.getItem('users'))).root;
}

//-----------------------------------------------------------
//----------------------GENERATE ROUTES----------------------
function showUsersForm(e){
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
}

//-----------------------------------------------------------
//----------------------SHOW GRAPH---------------------------
function openGraph(){
    let windows = window.open("UserGraph.html", "_blank");
    windows.focus();
}

//-----------------------------------------------------------
//----------------------SHOW BINNACLE---------------------------
function showBinnacle(carnet){
    let user = users.getUser(carnet);
    if(user){
        localStorage.setItem('userbin', JSON.stringify(JSON.decycle(user)));
        let windows = window.open("BinnacleGraph.html", "_blank");
        windows.focus();
    }
}

//-----------------------------------------------------------
//----------------------CLEAR USERS--------------------------
function clearUsers(){
    if(confirm("¿Está seguro de eliminar todos los usuarios?")){
        if (localStorage.getItem('users') != null) {
            localStorage.removeItem('users');
        }
        if(users.root != null){
            users = new AvlTree();
        }
        $('#usersTable tbody').html('');

        let routesform = document.getElementById('routesform');
        routesform.reset()
    }
}

//-----------------------------------------------------------
//-----------------SHOW LOCAL USERS IN THE TABLE-------------
function showLocalUsers(){
    loadLocalUsers();
    if(users.root != null){
        $('#usersTable tbody').html(
            users.inOrder()
        );
        $('#routes').val('inOrder');
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

$(document).ready(showLocalUsers);