class NAryTree{
    constructor(){
        this.root = new NAryNode('/');
        this.root.id = 0;
        this.size = 1;
    }

    //-----------------------------------------------------------
    //---------------------INSERT METHOD-------------------------
    insert(folderName, parentFolder){
        let newname = folderName;
        let newpath = parentFolder == '/' ? parentFolder+folderName : parentFolder+'/'+folderName;
        if(this.getFolder(newpath) != null){
            newname = 'Copia '+folderName;
        } 
        let parent = this.getFolder(parentFolder);
        if(parent){
            let newNode = new NAryNode(newname);
            newNode.id = this.size;
            this.size++;
            parent.children.push(newNode);
            return newname;
        }else{
            alert("La ruta no existe");
            return null;
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
        //---------------------PRINT FOLDERS---------------------
        node.children.map(child => {
            html += `<div class="folder col-2" onclick="insideFolder('${child.name}')">
                        <img src="./imgs/folder.png" width="100%"/>
                        <p class="h6 text-center">${child.name}</p>
                    </div>`})

        //---------------------PRINT FILES-----------------------
        if(node.files.root != null){
            let file = node.files.root.down;
            while(file){
                if(file.type.substring(0,file.type.indexOf("/")) == 'image'){
                    html += `<div class="folder col-2">
                                <a oncontextmenu="contextMenu(event, '${file.name}', '${file.value}')" href="${file.value}" download="${file.name}">
                                    <img src="./imgs/img.png" width="100%"/>
                                </a>
                                <p class="h6 text-center">${file.name}</p>
                            </div>`;
                }else if(file.type == 'application/pdf'){
                    html += `<div class="folder col-2">
                                <a oncontextmenu="contextMenu(event, '${file.name}', '${file.value}')" href="${file.value}" download="${file.name}">
                                    <img src="./imgs/pdf.png" width="100%"/>
                                </a>
                                <p class="h6 text-center">${file.name}</p>
                            </div>`;
                }else if(file.type == 'text/plain'){
                    html += `<div class="folder col-2">
                                <a oncontextmenu="contextMenu(event, '${file.name}', '${file.value}')" href="${file.value}" download="${file.name}.txt">
                                    <img src="./imgs/txt.png" width="100%"/>
                                </a>
                                <p class="h6 text-center">${file.name}</p>
                            </div>`;
                }
                file = file.down;
            }
        };
        return html;
    }
}