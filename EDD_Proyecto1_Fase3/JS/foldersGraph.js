function showGraph(){
    if(localStorage.getItem("user") != null){
        let folders = new NAryTree();
        folders.root = JSON.retrocycle(JSON.parse(localStorage.getItem("user"))).folders.root;
        let url = 'https://quickchart.io/graphviz?graph=';
        let body = `digraph G {${folders.treeGraph()}}`
        $("#graph").attr("src", url + body);
        console.log(body);
    }
}

$(document).ready(showGraph());