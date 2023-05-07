let user = new User(null,null,null,null);
let menu = document.querySelector(".wrappershare");
let mnedit = document.querySelector(".edit");

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
    menu.style.display = "block";

    $("#adownload").attr('href',itmvalue);
    $("#adownload").attr('download',itmname);
    
    $("#itmedit").attr('onclick',`editText(event,'${itmname}')`);
}

//-----------------------------------------------------------
//------------------EDIT AREA CONTEXT------------------------
function editText(e, itmname){
    e.preventDefault();
    
    if(localStorage.getItem('shares') != null){
        let shares = JSON.retrocycle(JSON.parse(localStorage.getItem('shares')));
        let file = null;
        let perms = 'r';
        shares.forEach(share => {
            if(user.carnet == share.user && itmname == share.file.perm){
                file = share.file;
                perms = share.perms;
            }
        });
        let txt = '';
        if(file != null){
            if(file.type != 'text/plain'){
                alert("Solo se pueden editar archivos de texto");
                return;
            }
            //Get the base64 string
            let txtBase64 = file.value.split(',')[1];
            //Decode the base64 string
            let decodedBufer = new Uint8Array(atob(txtBase64).split('').map(char => char.charCodeAt(0))).buffer;
            let utf8decoder = new TextDecoder("utf-8");
            
            txt = utf8decoder.decode(decodedBufer);
        }else{
            alert("No se encontró el archivo");
            return;
        }
        let x = 0, y = 0;
        mnedit.style.display = "block";
        mnedit.style.visibility = "hidden";
        let winwidth = window.innerWidth;
        let winheight = window.innerHeight;
        let editwidth = mnedit.clientWidth;
        let editheight = mnedit.clientHeight;

        x = (winwidth/2)-(editwidth/2);
        y = (winheight/2)-(editheight/2);

        $("#txtedit").html(`Editar '${itmname}'`);
        $("#editarea").val(txt);
        $("#formedit").attr('onsubmit', `editFile(event,'${itmname}')`);

        if(perms == 'r'){
            $("#editarea").attr('readonly',true);
            $("#btnedit").attr('disabled',true);
        }

        mnedit.style.left = `${x}px`;
        mnedit.style.top = `${y}px`;
        mnedit.style.visibility = "visible";
    }else{
        alert("No hay archivos compartidos");
    }
}

//-----------------------------------------------------------
//---------------------EDIT FILE-----------------------------
function editFile(e, itmname){
    e.preventDefault();

    let txt = $("#editarea").val();

    if(localStorage.getItem('shares') != null){
        let shares = JSON.retrocycle(JSON.parse(localStorage.getItem('shares')));
        let file = null;
        shares.forEach(share => {
            if(user.carnet == share.user && itmname == share.file.perm){
                file = share.file;
            }
        });
        if(file != null){
            if(file.type != 'text/plain'){
                alert("Solo se pueden editar archivos de texto");
            }else{
                //Parse the text to base64 data url
                const encoder = new TextEncoder();
                const encodetxt = encoder.encode(txt);
                let txtBase64 = btoa(String.fromCharCode.apply(null, encodetxt));
                let data = "data:text/plain;base64," + txtBase64;
                //Update the file
                file.value = data;
                
                //Update the shares
                let newshares = [];
                shares.forEach(share => {
                    if(user.carnet == share.user && itmname == share.file.perm){
                        share.file = file;
                    }
                    newshares.push(share);
                });
                localStorage.setItem('shares', JSON.stringify(JSON.decycle(newshares)));

                /*---------------------------------------------------
                ------ No relationship yet between shares and    ----
                ------ owner files, this only updates the shares ----
                ---------------------------------------------------*/

                showFolders();
                alert("Archivo editado con éxito");
            }
        }else{
            alert("No se encontró el archivo");
        }
    }else{
        alert("No hay archivos compartidos");
    }

    closeEdit(e);
}

//-----------------------------------------------------------
//------------------CLOSE EDIT CONTEXT-----------------------
function closeEdit(e){
    e.preventDefault();
    $("#editarea").val('');
    $("#editarea").attr('readonly',false);
    $("#btnedit").attr('disabled',false);
    mnedit.style.display = "none";
}

window.addEventListener('click', e => {
    menu.style.display = "none";
});

$(document).ready(welcomeUser)