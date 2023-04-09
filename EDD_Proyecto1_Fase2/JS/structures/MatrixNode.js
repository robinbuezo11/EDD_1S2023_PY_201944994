class MatrixNode{
    constructor(carnet, file, perm, name, value, type){
        this.carnet = carnet;
        this.file = file;
        this.perm = perm;
        this.name = name;
        this.value = value;
        this.type = type;

        this.up = null;
        this.down = null;
        this.right = null;
        this.left = null;
    }
}