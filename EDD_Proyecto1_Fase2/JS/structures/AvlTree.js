//let AvlNode = require('./AvlNode');

class AvlTree{
    constructor(){
        this.root = null;
    }

    getHeight(node){
        return node === null ? -1 : node.height;
    }

    getMaxHeight(rightnode, leftnode){
        return leftnode > rightnode ? leftnode : rightnode;
    }

    Insert(user){
        this.root = this.#insertRecursive(user, this.root);
    }

    //-----------------------------------------------------------
    //---------------------INSERTION METHOD----------------------

    #insertRecursive(user, node){
        if(node == null){
            node = new AvlNode(user)
        }else if(user.carnet < node.user.carnet){
            node.left = this.#insertRecursive(user, node.left);
            if(this.getHeight(node.left) - this.getHeight(node.right) == 2){
                if(this.getHeight(node.left.left) > this.getHeight(node.left.right)){
                    node = this.#rotateRight(node);
                }else{
                    node = this.#doubleRight(node);
                }
            }
        }else if(user.carnet > node.user.carnet){
            node.right = this.#insertRecursive(user, node.right);
            if(this.getHeight(node.right) - this.getHeight(node.left) == 2){
                if(this.getHeight(node.right.right) > this.getHeight(node.right.left)){
                    node = this.#rotateLeft(node);
                }else{
                    node = this.#doubleLeft(node);
                }
            }
        }else{
            alert("El usuario ya existe");
        }
        node.height = this.getMaxHeight(this.getHeight(node.left), this.getHeight(node.right)) + 1;
        return node;
    }

    //-----------------------------------------------------------
    //-------------------------ROTATIONS-------------------------

    #rotateRight(node){
        let nodeaux1 = node.left;

        node.left = nodeaux1.right;
        nodeaux1.right = node;
        node.height = this.getMaxHeight(this.getHeight(node.left), this.getHeight(node.right))+1;
        nodeaux1.height = this.getMaxHeight(this.getHeight(nodeaux1.left), this.getHeight(nodeaux1.right))+1;
        return nodeaux1;
    }

    #rotateLeft(node){
        let nodeaux1 = node.right;

        node.right = nodeaux1.left;
        nodeaux1.left = node;
        node.height = this.getMaxHeight(this.getHeight(node.left), this.getHeight(node.right))+1;
        nodeaux1.height = this.getMaxHeight(this.getHeight(nodeaux1.left), this.getHeight(nodeaux1.right))+1;
        return nodeaux1
    }

    #doubleLeft(node){
        node.right = this.#rotateRight(node.right);
        node = this.#rotateLeft(node);
        return node;
    }

    #doubleRight(node){
        node.left = this.#rotateLeft(node.left);
        node = this.#rotateRight(node);
        return node;
    }

    //-----------------------------------------------------------
    //----------------------ORDER OF ROUTES----------------------

    inOrder(){
        if(this.root == null){
            return `<tr><td colspan="3">No hay usuarios registrados</td></tr>`;
        }
        return this.#inOrderRecursive(this.root);
    }
    #inOrderRecursive(current){
        let row = "";
        if(current.left != null){
            row += this.#inOrderRecursive(current.left);
        }
        row +=`
            <tr>
                <th>${current.user.carnet}</th>
                <td>${current.user.firstname} ${current.user.lastname}</td>
                <td>${current.user.pass}</td>
            </tr>
        `;
        if(current.right != null){
            row += this.#inOrderRecursive(current.right);
        }
        return row;
    }

    preOrder(){
        return this.#preOrderRecursive(this.root);
    }
    #preOrderRecursive(current){
        let row = "";
        row +=`
            <tr>
                <th>${current.user.carnet}</th>
                <td>${current.user.firstname} ${current.user.lastname}</td>
                <td>${current.user.pass}</td>
            </tr>
        `;
        if(current.left != null){
            row += this.#preOrderRecursive(current.left);
        }
        if(current.right != null){
            row += this.#preOrderRecursive(current.right);
        }
        return row;
    }

    postOrder(){
        return this.#postOrderRecursive(this.root);
    }
    #postOrderRecursive(current){
        let row = "";
        if(current.left != null){
            row += this.#postOrderRecursive(current.left);
        }
        if(current.right != null){
            row += this.#postOrderRecursive(current.right);
        }
        row +=`
            <tr>
                <th>${current.user.carnet}</th>
                <td>${current.user.firstname} ${current.user.lastname}</td>
                <td>${current.user.pass}</td>
            </tr>
        `;
        return row;
    }


    /* inOrder(){
        return this.#inOrderRecursive(this.root);
    }
    #inOrderRecursive(current){
        let row = "";
        if(current.left != null){
            row += this.#inOrderRecursive(current.left);
        }
        row +=`
        ${current.user.carnet}
        ${current.user.firstname} ${current.user.lastname}
        ${current.user.pass}     
        `;
        if(current.right != null){
            row += this.#inOrderRecursive(current.right);
        }
        return row;
    } */
}

// module.exports = AvlTree;