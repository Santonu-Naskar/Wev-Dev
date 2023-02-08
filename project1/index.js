console.log('note taking app');
showNotes();

let addBtn=document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addTxt=document.getElementById('addTxt');
    let addTitle=document.getElementById('addTitle');
    let notes=localStorage.getItem('notes');
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    let vtitle=addTitle.value;
    let vtxt=addTxt.value;
    notesObj.push({vtitle,vtxt});
    localStorage.setItem('notes',JSON.stringify(notesObj));
    addTxt.value='';
    addTitle.value='';
    
    showNotes();
})

// print all nodes___________________________
function showNotes(){
    let notes=localStorage.getItem('notes');
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    let html='';
    notesObj.forEach(function (e,i) {
        html+=`
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Note ${e.vtitle}</h5>
          <p class="card-text">${e.vtxt}</p>
          <button id="${i}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
      </div>
      `
    })
    let notesadd=document.getElementById('notes');
    if(notesObj.length!=0){
        notesadd.innerHTML=html;
    }
    else{
        notesadd.innerHTML=`use add note to add a notes`;
    }
}


//delete elements function____________________________
function deleteNote(i) {
    console.log('i am deleting', i);

    let notes=localStorage.getItem('notes');
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    
    notesObj.splice(i,1);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    showNotes();
}

// search text from search bar_________________________________________
let searchTxt= document.getElementById('searchTxt');
searchTxt.addEventListener('input', function (e) {
    
    let txt=document.getElementsByClassName('noteCard');
    Array.from(txt).forEach(function (e) {
        itxt=e.getElementsByClassName('card-text')[0].innerText;
        ititle=e.getElementsByClassName('card-title')[0].innerText;
        if(itxt.toLowerCase().includes(searchTxt.value.toLowerCase()) || ititle.toLowerCase().includes(searchTxt.value.toLowerCase())){
            e.style.display='block';
        }
        else {
            e.style.display='none';
        }
    })
})
