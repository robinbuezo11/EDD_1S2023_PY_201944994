class CircularList{
    constructor(){
        this.root = null;
    }

    insert(value){
        let newNode = new ListNode(value);
        if(this.root == null){
            this.root = newNode;
            this.root.next = this.root;
        }else{
            let current = this.root;
            while(current.next != this.root){
                current = current.next;
            }
            current.next = newNode;
            newNode.next = this.root;
        }
    }

    graphList(){
        let id = 0;
        let nodes = "rankdir=LR;\nnode [shape=record];\n";
        if(this.root == null){
            return graph + "Vacío";
        }
        let current = this.root;
        let conn = "";
        while(current.next != this.root){
            nodes += "N" + id +"[label=\"" + current.value.replaceAll("\n","\\n").replaceAll("\"","\\\"") + "\"];\n";
            conn += "N" + id + " -> ";
            current = current.next;
            id++;
        }
        nodes += "N" + id +"[label=\"" + current.value.replaceAll("\n","\\n").replaceAll("\"","\\\"") + "\"];\n";
        conn += "N" + id + " -> N0;\n";
        return nodes + "\n" + conn;
    }
}