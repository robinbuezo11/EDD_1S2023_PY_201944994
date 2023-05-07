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
}