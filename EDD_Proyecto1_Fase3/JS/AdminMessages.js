let messages = new BlockChain();

function loadMessages(){
    if(localStorage.getItem('messages')){
        let localMessages = JSON.parse(localStorage.getItem('messages'))
        messages.head = localMessages.head;
        messages.tail = localMessages.tail;
        messages.size = localMessages.size;
    }
}

function getBlock(index){
    loadMessages();
    if(index === 0){
        let html = messages.blockReport(index);
        if(html){
            $('#show-block').html(html);
        }
    }else{
        let currentBlock = Number($('#block-table').attr('name'));
        
        if(index < 0){
            if(currentBlock - 1 < 0){
                alert("No existen elementos anteriores");
            }else{
                let html = messages.blockReport(currentBlock - 1);
                if(html){
                    $('#show-block').html(html);
                }
            }

        }else if(index > 0){
            if(currentBlock + 1 >= messages.size ){
                alert("No existen elementos siguientes");
            }else{
                let html = messages.blockReport(currentBlock + 1);
                if(html){
                    $('#show-block').html(html);
                }
            }
        }
    }
}

window.addEventListener('keyup', function(event){
    if(event.key === "ArrowLeft"){
        getBlock(-1);
    }else if(event.key === "ArrowRight"){
        getBlock(1);
    }
});

$(document).ready(getBlock(0));