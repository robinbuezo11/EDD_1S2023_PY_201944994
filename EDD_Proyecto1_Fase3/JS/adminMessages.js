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
                let html = messages.blockReport(messages.size - 1);
                if(html){
                    $('#show-block').html(html);
                }
            }else{
                let html = messages.blockReport(currentBlock - 1);
                if(html){
                    $('#show-block').html(html);
                }
            }
        }else if(index > 0){
            if(currentBlock + 1 >= messages.size ){
                let html = messages.blockReport(0);
                if(html){
                    $('#show-block').html(html);
                }
            }else{
                let html = messages.blockReport(currentBlock + 1);
                if(html){
                    $('#show-block').html(html);
                }
            }
        }
    }
}

function openMessagesGraph(){
    window.open('MessagesGraph.html', '_blank');
}

window.addEventListener('keyup', function(event){
    if(event.key === "ArrowLeft"){
        getBlock(-1);
    }else if(event.key === "ArrowRight"){
        getBlock(1);
    }
});

$(document).ready(getBlock(0));