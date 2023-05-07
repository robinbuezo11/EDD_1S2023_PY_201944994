class SparseMatrix{

    constructor(){
        this.root = new MatrixNode(null, null, "DOCUMENTOS", null, null, null);
    }

    //-----------------------------------------------------------
    //----------------------INSERT FILE--------------------------
    insert(carnet, file, perm, name, value, type){
        let newfile = file, newname = name;
        this.#carnetHeader(carnet);
        let t = this.#fileHeader(newfile,newname,value,type);
        newfile = t.file;
        newname = t.name;

        const node = new MatrixNode(carnet,newfile,perm,newname,value,type);

        this.#addCarnet(node, carnet);
        this.#addFile(node, newfile);
        return newfile;
    }

    //-----------------------------------------------------------
    //------------------------ADD PERMS--------------------------
    insertPerms(carnet, file, perm, name, value, type){
        this.#carnetHeader(carnet);

        const node = new MatrixNode(carnet,file,perm,name,value,type);

        this.#addCarnet(node, carnet);
        this.#addFile(node, file);
    }

    //-----------------------------------------------------------
    //----------------INSERT CARNET (COLUMNS)--------------------
    #carnetHeader(carnet){
        const curr = new MatrixNode(null,null, carnet);
        if(this.root.right == null){
            this.root.right = curr;
            curr.left = this.root;
        }else{
            let temp = this.root;
    
            while(temp.right != null && temp.right.perm < carnet){
                temp = temp.right;
            }
            
            if(temp.right == null){
                temp.right = curr;
                curr.left = temp;
            }else if(temp.right != null && temp.right.perm != carnet){
                let aux = temp.right;
                temp.right = curr;
                curr.left = temp;
                curr.right = aux;
                aux.left = curr;
            }
        }
    }
    

    //-----------------------------------------------------------
    //--------------------INSERT FILE (ROWS)---------------------
    #fileHeader(file,name,value,type){
        const curr = new MatrixNode(null,null,file,name,value,type);
        if(this.root.down == null){
            this.root.down = curr;
            curr.up = this.root;
            return {file,name};
        }else{
            let temp = this.root;
    
            while(temp.down != null && temp.down.perm.toLowerCase() < file.toLowerCase()){
                temp = temp.down;
            }
            
            if(temp.down == null){
                temp.down = curr;
                curr.up = temp;
                return {file,name};
            }else if(temp.down != null && temp.down.perm.toLowerCase() != file.toLowerCase()){
                let aux = temp.down;
                temp.down = curr;
                curr.up = temp;
                curr.down = aux;
                aux.up = curr;
                return {file,name};
            }else if(temp.down != null && temp.down.perm.toLowerCase() == file.toLowerCase()){
                let ext = file.substring(file.lastIndexOf('.') + 1);
                return this.#fileHeader(name + '-copia.' + ext,name + '-copia',value,type);
            }
        }
    }
    
    //-----------------------------------------------------------
    //---------------ADD IN THE CARNETS (COLUMNS)----------------
    #addCarnet(newNode, carnet){
        let temp = this.root;

        // SEARCH THE HEADER
        while(temp.perm != carnet){
            temp = temp.right;
        }

        // INSERT THE NODE IF COLUMN IS EMPTY
        if(temp.down == null){
            temp.down = newNode;
            newNode.up = temp;
        }else{
            // INSERT IN ORDER
            while(temp.down != null && temp.down.file.toLowerCase() < newNode.file.toLowerCase()){
                temp = temp.down;
            }
            if(temp.down != null){
                if(temp.down.file.toLowerCase() == newNode.file.toLowerCase()){
                    temp.down.perm = newNode.perm;
                    return;
                }
            }
            newNode.down = temp.down;
            if(temp.down != null){
                temp.down.up = newNode;
            }
            temp.down = newNode;
            newNode.up = temp;
        }
    }
    
    //-----------------------------------------------------------
    //------------------ADD IN THE FILES (ROWS)------------------
    #addFile(newNode, file){
        let temp = this.root;

        // SEARCH THE HEADER
        while(temp.perm.toLowerCase() != file.toLowerCase()){
            temp = temp.down;
        }

        // INSERT THE NODE IF ROW IS EMPTY
        if(temp.right == null){
            temp.right = newNode;
            newNode.left = temp;
        }else{
            // INSERT IN ORDER
            while(temp.right != null && temp.right.carnet < newNode.carnet){
                temp = temp.right;
            }
            if(temp.right != null){
                if(temp.right.carnet == newNode.carnet){
                    return;
                }
            }
            newNode.right = temp.right;
            if(temp.right != null){
                temp.right.left = newNode;
            }
            temp.right = newNode;
            newNode.left = temp;
        }
    }

    //-----------------------------------------------------------
    //--------------------------GET FILE-------------------------
    getFile(filename){
        if(this.root.down == null){
            return null;
        }else{
            let current = this.root.down;
            while(current){
                if(current.perm == filename){
                    return current;
                }
                current = current.down;
            }
            return null;
        }
    }

    //-----------------------------------------------------------
    //--------------------------SET FILE-------------------------
    setFile(filename, file){
        if(this.root.down == null){
            return false;
        }else{
            let current = this.root.down;
            while(current){
                if(current.perm == filename){
                    current = file;
                    return true;
                }
                current = current.down;
            }
            return false;
        }
    }

    //-----------------------------------------------------------
    //----------------------GRAPH MATRIX-------------------------
    matrixGraph(){
        if(this.root.down == null){
            return null;
        }
        let code = " \nnode[nodesep=\"0.8\", ranksep=\"0.6\"]; \n";
		code +="M0[ label = \"ARCHIVOS\" width = 1.5 shape = \"square\" style = \"filled\" fillcolor =\"lightsalmon\" group=\"0\"]; \n";
        code += this.#headersGraph()
        code += this.#nodesGraph()
        // console.log(code)
        return(code)
    }
    #headersGraph(){
        let conn = "M0 ->";
        let nodes = "";
        let rank = "{rank = same; M0; "
        let temp = null;
        try { temp = this.root.right } catch (error) { temp = null; console.log("GRAPH"); }
        while(temp != null){
            nodes += "X" + temp.perm + `[label="${temp.perm}" width = 1.5 shape ="square" style="filled" fillcolor="mediumspringgreen" group = ${temp.perm} ];\n`
            rank += "X" + temp.perm + ";";
            if(temp.right != null){
                conn += "X" + temp.perm + "->";
            }else{
                conn += "X" + temp.perm + `[dir="both"];\n`;
            }
            temp = temp.right;
        }
        
        conn += 'M0 ->';
        try { temp = this.root.down } catch (error) { temp = null; console.log("GRAPH"); }
        while(temp != null){
            nodes += "Y" + temp.perm.replace(".","").replace("-","") + `[label="${temp.perm}" width = 1.5 shape ="square" style="filled" fillcolor="mediumspringgreen" group="0"];\n`
            if(temp.down != null){
                conn += "Y" + temp.perm.replace(".","").replace("-","") + "->";
            }else{
                conn += "Y" + temp.perm.replace(".","").replace("-","") + `[dir="both"];\n`;
            }
            temp = temp.down;
        }
        
        rank += "}";
        return nodes +"\n"+ conn +"\n"+ rank +"\n";
    }
    #nodesGraph(){
        let conn = "";
        let nodes = "";
        let rank = ""
        let tfile = null;
        try { tfile = this.root.down } catch (error) { tfile = null; console.log("errorFile1"); }
        let tcarnet = null;
        while(tfile != null){
            try { tcarnet = tfile.right } catch (error) { tcarnet = null; console.log("errorFile2"); } 
            conn += `Y${tcarnet.file.replace(".","").replace("-","")} -> `
            while(tcarnet != null){
                nodes += `S${tcarnet.file.replace(".","").replace("-","")}_${tcarnet.carnet}[label="${tcarnet.perm}" width=1.5 shape="square" style="filled" fillcolor="lightyellow" group="${tcarnet.carnet}"];\n`
                rank += `{rank=same; Y${tcarnet.file.replace(".","").replace("-","")}; S${tcarnet.file.replace(".","").replace("-","")}_${tcarnet.carnet};}\n`;
                if(tcarnet.right != null){
                    conn += `S${tcarnet.file.replace(".","").replace("-","")}_${tcarnet.carnet} ->`;
                }else{
                    conn += `S${tcarnet.file.replace(".","").replace("-","")}_${tcarnet.carnet} [dir="both"]; \n`;
                }
                tcarnet = tcarnet.right;
            }
            tfile = tfile.down;
        }
        
        try { tcarnet = this.root.right } catch (error) { tcarnet = null; console.log("errorCarnet1"); }
        tfile = null;
        while(tcarnet != null){
            try { tfile = tcarnet.down } catch (error) { tfile = null; console.log("errorCarnet2"); } 
            conn += `X${tfile.carnet} -> `
            while(tfile != null){
                if(tfile.down != null){
                    conn += `S${tfile.file.replace(".","").replace("-","")}_${tfile.carnet} ->`;
                }else{
                    conn += `S${tfile.file.replace(".","").replace("-","")}_${tfile.carnet} [dir="both"]; \n`;
                }
                tfile = tfile.down;
            }
            tcarnet = tcarnet.right;
        }

        return nodes + "\n" + rank + "\n" + conn;
    }
}