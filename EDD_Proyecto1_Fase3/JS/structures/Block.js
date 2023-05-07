class Block{
    constructor(index, transmitter, receiver, message, previousHash, hash){
        this.index = index;
        this.timestamp = new Date();
        this.transmitter = transmitter;
        this.receiver = receiver;
        this.message = message;
        this.previousHash = previousHash;
        this.hash = hash;

        this.next = null;
        this.prev = null;
    }

    getFormatedDate(){
        let day = this.timestamp.getDate();
        let month = this.timestamp.getMonth() + 1;
        let year = this.timestamp.getFullYear();
        let hour = this.timestamp.getHours();
        let min = this.timestamp.getMinutes();
        let sec = this.timestamp.getSeconds();
        return `${day}-${month}-${year} :: ${hour}:${min}:${sec}`;
    }
}