let users = new AvlTree();

//-----------------------------------------------------------
//-----------------------USERS UPLOAD------------------------
function loadUsersForm(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    let usersArray = [];
    try{
        let reader = new FileReader();
        reader.readAsText(form.inputFile)
        reader.onload = () => {
            usersArray = JSON.parse(reader.result).alumnos;

            //INSERTAR A LOS USUARIOS EN EL ARBOL
            for(let i=0; i<usersArray.length; i++){
                let name = usersArray[i].nombre.trim().split(" ");
                users.Insert(new User(name[0], name[1], usersArray[i].carnet, usersArray[i].password));
            }

            //GUARDAR EL ARBOL EN EL LOCAL STORAGE
            localStorage.setItem('users', JSON.stringify(users));

            //INSERTAR A LOS USUARIOS EN LA TABLA
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
    }catch(error){
        console.log(error);
        alert("Error en la inserción de Usuarios")
    }
}

//-----------------------------------------------------------
//--------------SHOW USERS IN LOCAL STORAGE------------------
function showLocalUsers(){
    if (localStorage.getItem('users') == null) {
        return;
    }
    let aux = localStorage.getItem('users');
    users.root = JSON.parse(aux).root;
    $('#usersTable tbody').html(
        users.inOrder()
    );
}

//-----------------------------------------------------------
//----------------------GENERATE ROUTES----------------------
function showUsersForm(e){
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

function openGraph(){
    let windows = window.open("UserGraph.html", "_blank");
    windows.focus();
}

$(document).ready(showLocalUsers);