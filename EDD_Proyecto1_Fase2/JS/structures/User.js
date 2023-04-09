class User{
    constructor(firstn, lastn, carnet, pass){
        this.firstname = firstn;
        this.lastname = lastn;
        this.carnet = carnet
        this.pass = pass;
        this.folders = new NAryTree();
        this.binnacle = new CircularList();
    }
}

// module.exports = User;