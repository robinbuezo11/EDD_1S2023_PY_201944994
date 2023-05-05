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
        //let users = new AvlTree();
        let users = new HashTable();
        let localusers = JSON.retrocycle(JSON.parse(localStorage.getItem('users')));
        users.table = localusers.table;
        users.size = localusers.size;
        users.capacity = localusers.capacity;

        //-----------------SEARCH USER----------------------
        let usertemp = users.getUser(user);
        let userlogin = null;
        if(usertemp){
            let passtemp = CryptoJS.AES.decrypt(usertemp.pass, 'P@$$w0rd').toString(CryptoJS.enc.Utf8);
            if(passtemp == pass){
                userlogin = usertemp;
            }
        }

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
