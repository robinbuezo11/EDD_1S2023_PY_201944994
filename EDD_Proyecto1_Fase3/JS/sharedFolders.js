let user = new User(null,null,null,null);
let menu = document.querySelector(".wrappershare");

//-----------------------------------------------------------
//--------------------INITIAL FUNCTION-----------------------
function welcomeUser(){
    if(localStorage.getItem('user') != null){
        user = JSON.retrocycle(JSON.parse(localStorage.getItem('user')));
        localStorage.removeItem('user');
        $('#welcomeusr').html('¡Compartidos con ' + user.firstname + ' ' + user.lastname + '!');
        showFolders();
    }else{
        window.top.close();
    }
}

function showFolders(){
    if(localStorage.getItem('shares') != null){
        let shares = JSON.retrocycle(JSON.parse(localStorage.getItem('shares')));
        let html = '';
        shares.forEach(share => {
            if(user.carnet == share.user){
                let file = share.file;
                if(file.type.substring(0,file.type.indexOf("/")) == 'image'){
                    html += `<div class="folder col-2">
                                <a class="ps-4 ms-2" oncontextmenu="contextMenu(event, '${file.perm}', '${file.value}')" href="${file.value}" download="${file.name}">
                                    <img src="./imgs/img.png" width="80%"/>
                                </a>
                                <p class="h6 text-center">${file.name}</p>
                            </div>`;
                }else if(file.type == 'application/pdf'){
                    html += `<div class="folder col-2">
                                <a class="ps-4 ms-2" oncontextmenu="contextMenu(event, '${file.perm}', '${file.value}')" href="${file.value}" download="${file.name}">
                                    <img src="./imgs/pdf.png" width="80%"/>
                                </a>
                                <p class="h6 text-center">${file.name}</p>
                            </div>`;
                }else if(file.type == 'text/plain'){
                    html += `<div class="folder col-2">
                                <a class="ps-4 ms-2" oncontextmenu="contextMenu(event, '${file.perm}', '${file.value}')" href="${file.value}" download="${file.name}.txt">
                                    <img src="./imgs/txt.png" width="80%"/>
                                </a>
                                <p class="h6 text-center">${file.name}</p>
                            </div>`;
                }
            }
        });
        $('#folders').html(html);
    }
}

//-----------------------------------------------------------
//-----------------CONTEXT MENU FILES--------------------
function contextMenu(e, itmname, itmvalue){
    e.preventDefault();

    let x = e.pageX, y = e.pageY,
    winwidth = window.innerWidth,
    winheight = window.innerHeight,
    cmwidth = menu.offsetWidth,
    cmheight = menu.offsetHeight;

    x = x > winwidth - cmwidth ? winwidth - cmwidth : x;
    y = y > winheight - cmheight ? winheight - cmheight : y;

    menu.style.left = `${x}px`;
    menu.style.top = `${y}px`;
    menu.style.visibility = "visible";

    $("#adownload").attr('href',itmvalue);
    $("#adownload").attr('download',itmname);
    
    $("#itmshare").attr('onclick',`menuShare(event,'${itmname}')`)
}

window.addEventListener('click', e => {
    menu.style.visibility = "hidden";
});

$(document).ready(welcomeUser)