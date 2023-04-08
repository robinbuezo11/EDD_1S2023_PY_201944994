class NAryNode {
    constructor(folderName) {
        this.perms = new SparseMatrix();  //Se convertira en files
        this.name = folderName;
        this.children = [];
        this.files = []; //Debe desaparecer para poder guardarlos en la matriz dispersa
        this.id = null;
    }
}