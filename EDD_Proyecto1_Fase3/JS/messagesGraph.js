function showGraph(){
    if(localStorage.getItem("messages") != null){
        let messages = new BlockChain();
        let localMessages = JSON.parse(localStorage.getItem('messages'))
        messages.head = localMessages.head;
        messages.tail = localMessages.tail;
        messages.size = localMessages.size;
        let url = 'https://quickchart.io/graphviz?graph=';
        let body = `digraph G { ${messages.getGraph()} }`
        $("#graph").attr("src", url + body);
        console.log(body);
    }
}

$(document).ready(showGraph());