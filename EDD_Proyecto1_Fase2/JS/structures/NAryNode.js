class NAryNode {
    constructor(folderName) {
        this.name = folderName;
        this.children = [];
        this.files = []; //Debe desaparecer para poder guardarlos en la matriz dispersa
        this.id = null;
        //Permisos - Matriz dispersa
    }
}