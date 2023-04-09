class NAryNode {
    constructor(folderName) {
        this.name = folderName;
        this.children = [];
        this.id = null;
        this.files = new SparseMatrix();  //The files are saved here now
        //this.files = []; //Files disappear and become a SparseMatrix
    }
}