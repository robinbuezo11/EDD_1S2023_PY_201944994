class BlockChain{
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    async insert(transmittor, receiver, message){
        let newBlock = new Block(this.size, transmittor, receiver, message, "", "");
        if(this.head == null){
            newBlock.previousHash = "00000"
            newBlock.hash = await this.getSha256(newBlock);

            this.head = newBlock;
            this.tail = newBlock;
            this.size++;
        }else{
            newBlock.previousHash = this.tail.hash;
            newBlock.hash = await this.getSha256(newBlock);

            this.tail.next = newBlock;
            newBlock.prev = this.tail;
            this.tail = newBlock;
            this.size++;
        }
    }

    async getSha256(block){
        let str = JSON.stringify(block).toString();
        let bytes = new TextEncoder().encode(str);
        let hashBytes = await window.crypto.subtle.digest('SHA-256', bytes);
        let hash = Array.prototype.map.call(new Uint8Array(hashBytes), x => ('00' + x.toString(16)).slice(-2)).join('');
        return hash;
    }

    getMessages(transmittor, receiver){
        if(this.head != null){
            let msgs = "";
            let current = this.head;
            while(current != null){
                if(String(current.receiver) === String(transmittor)){
                    if(String(current.transmittor) === String(receiver)){
                        msgs += `<li class="list-group-item">${current.message}</li>`;
                    }
                }else if(String(current.transmittor) === String(transmittor)){
                    if(String(current.receiver) === String(receiver)){
                        msgs += `<li class="list-group-item bg-primary text-light" style="text-align: right">${current.message}</li>`;
                    }
                }
                current = current.next;
            }
            if(msgs){
                return `
                    <ul class="list-group">
                        ${msgs}
                    </ul>
                `;
            }
        }
        return `No hay mensajes`;
    }

    blockReport(index = 0){
        if(this.head){
            let current = this.head;
            while(current != null){
                if(current.index === index){
                    return `
                        <table class="table table-bordered" id="block-table" name="${current.index}">
                            <tbody>
                                <tr>
                                    <th scope="row" class="col-3">Index</th>
                                    <td class="col-9">${current.index}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Timestamp</th>
                                    <td>${current.getFormatDate()}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Transmittor</th>
                                    <td>${current.transmittor}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Receiver</th>
                                    <td>${current.receiver}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Message</th>
                                    <td>${current.message}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Previous Hash</th>
                                    <td>${current.previousHash}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Hash</th>
                                    <td>${current.hash}</td>
                                </tr>
                            </tbody>
                        </table>
                    `;
                }else{
                    current = current.next;
                }
            }
        }
        return "";
    }
}