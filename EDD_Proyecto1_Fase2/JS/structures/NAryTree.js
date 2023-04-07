class NAryTree{
    constructor(){
        this.root = new NAryNode('/');
        this.root.id = 0;
        this.size = 1;
    }

    //-----------------------------------------------------------
    //---------------------INSERT METHOD-------------------------
    insert(folderName, parentFolder){
        let parent = this.getFolder(parentFolder);
        if(parent){
            let newNode = new NAryNode(folderName);
            newNode.id = this.size;
            this.size++;
            parent.children.push(newNode);
            return true;
        }else{
            alert("La ruta no existe");
            return false;
        }
    }

    //-----------------------------------------------------------
    //---------------------DELETE METHOD-------------------------
    delete(folderName){
        if(folderName == this.root.name){
            alert("No se puede eliminar la carpeta raíz");
            return false;
        }else{
            let parent = folderName.substring(0, folderName.lastIndexOf('/'));
            let folder = folderName.substring(folderName.lastIndexOf('/') + 1);
            let parentNode = this.getFolder(parent);
            if(parentNode){
                let index = parentNode.children.findIndex(child => child.name == folder);
                if(index != -1){
                    parentNode.children.splice(index, 1);
                    return true;
                }else{
                    alert("La carpeta no existe");
                    return false;
                }
            }else{
                alert("La ruta no existe");
                return false;
            }
        }
    }

    //-----------------------------------------------------------
    //---------------------GET FOLDER METHOD---------------------
    getFolder(folderName){
        if(folderName == this.root.name){
            return this.root;
        }else{
            let temp = this.root;
            let folders = folderName.split('/');
            folders = folders.filter(str => str != '');
            let folder = null;
            while(folders.length > 0){
                let currentfolder = folders.shift();
                folder = temp.children.find(nfolder => nfolder.name == currentfolder);
                if(typeof folder == 'undefined' || folder == null){
                    return null;
                }
                temp = folder;
            }
            return temp;
        }
    }

    //-----------------------------------------------------------
    //---------------------METHOD TO GRAPH-----------------------
    treeGraph(){
        let nodes = "";
        let connections = "";

        let node = this.root;
        let queue = [];
        queue.push(node);
        while(queue.length !== 0){
            let len = queue.length;
            for(let i=0; i < len; i++){
                node = queue.shift();
                nodes += `S_${node.id}[label="${node.name}"];\n`;
                node.children.forEach(child => {
                    queue.push(child);
                    connections += `S_${node.id} -> S_${child.id};\n`;
                });
            }
        }
        return `node[shape="record"];\n${nodes}\n${connections}`;
    }

    //-----------------------------------------------------------
    //---------------------METHOD TO GET HTML--------------------
    getHtml(folder){
        let node = this.getFolder(folder);
        //console.log(node);
        let html = "";
        node.children.map(child => {
            html += `<div class="col-2 folder" onclick="insideFolder('${child.name}')">
                        <img src="./imgs/folder.png" width="100%"/>
                        <p class="h6 text-center">${child.name}</p>
                    </div>`})
        node.files.map(file => {
            if(file.type == 'text/plain'){
                let ext = new Blob([file.content], file.type);
                const url = URL.createObjectURL(ext);
                html += `<div class="col-2 folder">
                            <img src="./imgs/file.png" width="100%"/>
                            <p class="h6 text-center">
                                <a href="${url}" download>
                                    ${file.name}
                                </a>
                            </p>
                        </div>`;
            }else{
                html += `<div class="col-2 folder">
                            <img src="./imgs/file.png" width="100%"/>
                            <p class="h6 text-center">
                                <a href="${file.content}" download>
                                    ${file.name}
                                </a>
                            </p>
                        </div>`;
            }
        });
        return html;
    }
}