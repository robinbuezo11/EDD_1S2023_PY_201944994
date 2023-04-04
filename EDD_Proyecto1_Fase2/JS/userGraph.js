function showGraph(){
    let users = new AvlTree();
    let temp = JSON.retrocycle(JSON.parse(localStorage.getItem("users")));
    users.root = temp.root;
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { ${users.treeGraph()} }`
    $("#graph").attr("src", url + body);
    console.log(body);
}

$(document).ready(showGraph());