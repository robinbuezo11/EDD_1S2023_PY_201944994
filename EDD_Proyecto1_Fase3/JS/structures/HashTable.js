class HashTable{
    constructor(){
        this.table = new Array(7);
        this.capacity = 7;
        this.size = 0;
    }

    //-----------------------------------------------------------
    //---------------------INSERTION METHOD----------------------

    insert(user){
        let index = this.#calculateIndex(user.carnet);
        if(index < this.capacity){
            if(!this.table[index]){
                this.table[index] = user;
                this.size++;
            }else{
                let count = 0;
                index = this.#recalculateIndex(user.carnet, count);
                while(this.table[index]){
                    count++;
                    index = this.#recalculateIndex(user.carnet, count);
                }
                this.table[index] = user;
                this.size++;
            }
            this.#checkCapacity();
        }
    }

    #calculateIndex(carnet){
        let strCarnet = carnet.toString();
        let total = 0;
        for(let i = 0; i < strCarnet.length; i++){
            total += strCarnet.charCodeAt(i);
        }
        return total % this.capacity;
    }

    #recalculateIndex(carnet, count){
        let index = this.#calculateIndex(carnet) + (count * count);
        let newIndex = this.#newIndex(index);
        return newIndex;
    }

    #newIndex(index){
        let pos = 0;
        if(index < this.capacity){
            pos = index;
        }else{
            pos = index - this.capacity;
            pos = this.#newIndex(pos);
        }
        return pos;
    }

    #checkCapacity(){
        const utilization = this.capacity * 0.75;
        if(this.size >= utilization){
            this.capacity = this.#nextPrime();
            this.size = 0;

            const oldTable = this.table;
            this.table = new Array(this.capacity);
            oldTable.forEach(user => {
                if(user){
                    this.insert(user);
                }
            });
        }
    }

    #nextPrime(){
        let prime = this.capacity + 1;
        while(!this.#isPrime(prime)){
            prime++;
        }
        return prime;
    }

    #isPrime(num){
        if(num <= 1){return false;}
        if(num === 2){return true;}
        if(num % 2 === 0){return false;}
        for(let i = 3; i <= Math.sqrt(num); i += 2){
            if(num % i === 0){return false;}
        }
        return true;
    }

    //-----------------------------------------------------------
    //-----------------------GET USERS HTML----------------------
    getUsersHtml(){
        if(this.size == 0){
            return "";
        }
        let row = "";
        this.table.forEach(user => {
            if(user){
                row +=`
                    <tr>
                        <th>${user.carnet}</th>
                        <td>${user.firstname} ${user.lastname}</td>
                        <td>${user.pass}</td>
                        <!--<td><button class="btn btn-sm" id="binnacle" onclick="showBinnacle(${user.carnet})">Bitácora</button></td>-->
                    </tr>
                `;
            }
        });
        return row;
    }
}