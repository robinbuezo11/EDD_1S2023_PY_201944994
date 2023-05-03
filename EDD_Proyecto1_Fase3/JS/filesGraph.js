function showGraph(){
    if(localStorage.getItem("user") != null && localStorage.getItem('path') != null){
        let folders = new NAryTree();
        let files = new SparseMatrix();

        folders.root = JSON.retrocycle(JSON.parse(localStorage.getItem("user"))).folders.root;
        files.root = folders.getFolder(JSON.parse(localStorage.getItem('path'))).files.root;

        let url = 'https://quickchart.io/graphviz?graph=';
        let body = `digraph G { ${files.matrixGraph()} }`
        $("#graph").attr("src", url + body);
        //console.log(url + body);
    }
}

$(document).ready(showGraph());