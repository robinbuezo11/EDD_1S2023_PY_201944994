function showGraph(){
    if(localStorage.getItem("userbin") != null){
        let user = new User();
        let binnacle = new CircularList();
        user = JSON.retrocycle(JSON.parse(localStorage.getItem("userbin")));
        binnacle.root = user.binnacle.root;
        $("#title").html("Bitacora de " + user.firstname + " " + user.lastname);
        let url = 'https://quickchart.io/graphviz?graph=';
        let body = `digraph G { ${binnacle.graphList()} }`
        $("#graph").attr("src", url + body);
        console.log(body);
    }
}

$(document).ready(showGraph());