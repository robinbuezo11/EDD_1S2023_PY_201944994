/* let AvlTree = require('./structures/AvlTree');
let User = require('./structures/User');
let AvlNode = require('./structures/AvlNode'); */

/*users.Insert(new User('Robin','Buezo',201944994,'Robd11'));
console.log(users.inOrder()); */

//-----------------------------------------------------------
//----------------------LOGIN FUNCTION-----------------------
function login(e){
    e.preventDefault();
    let user = $('#user').val();
    let pass = $('#pass').val();

    if(user == 'admin' && pass == 'admin'){
        window.location.href = "DashboardAdmin.html";
    }else{
        $('#pass').val('');
        alert("Usuario o contraseña incorrectos");
    }
}
