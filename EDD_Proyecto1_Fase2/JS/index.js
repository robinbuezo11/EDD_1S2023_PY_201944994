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

    //---------------------VERIFY ADMIN----------------------
    if(user == 'Admin' && pass == 'Admin'){
        window.location.href = "DashboardAdmin.html";
        //localStorage.clear();
        return;
    }

    //---------------------VERIFY USER----------------------
    if(localStorage.getItem('users') != null){
        let users = new AvlTree();
        users.root = JSON.retrocycle(JSON.parse(localStorage.getItem('users'))).root;
        //-----------------SEARCH USER----------------------
        userlogin = users.userLogin(user, pass);
        if(userlogin){
            //console.log(userlogin);
            //---------------SAVE USER----------------------
            localStorage.setItem('user', JSON.stringify(JSON.decycle(userlogin)));
            window.location.href = "DashboardUser.html";
            return;
        }
    }
    
    //---------------ERROR MESSAGE--------------------------
    $('#pass').val('');
    alert("Usuario o contraseña incorrectos");
    
}
