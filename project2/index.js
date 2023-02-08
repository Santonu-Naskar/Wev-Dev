console.log("hello i am managing the library");

// showtable call;


//create class library
class books {
    constructor(bookName, Author, Type) {
        this.bookName = bookName;
        this.Author = Author;
        this.Type = Type;
    }
}

class Display {
    shownotes() {
        let insertHTML = document.getElementById('table');
        let notes = localStorage.getItem('booklist');
        let notesObj = [];
        if (notes == null) {
            notesObj = [];
        }
        else {
            notesObj = JSON.parse(notes);
        }

        insertHTML.innerHTML='';
        notesObj.forEach(function (e, i) {
            let html = `<tr class="rows">
                    <th scope="row">${i+1}</th>
                    <td class="tBookName">${e.bookName}</td>
                    <td class="tAuthor">${e.Author}</td>
                    <td class="tType">${e.Type}</td>
                    <td><button id="${i}" class="btn btn-primary" onclick=delBtn(${i})>Delete</button></td>
                </tr>`
            
            insertHTML.innerHTML += html;
            
        })
    }

    valied(books) {
        if (books.Author.length < 2 || books.bookName.length < 2) {
            return false;
        }
        else {
            return true;
        }
    }
    show(type, massage) {
        let insertHTML = document.getElementById('show');
        let html = `<div class="alert alert-${type} alert-dismissible fade show p-2 mt-2 shadow mb-5 rounded" role="alert">
                        ${massage}
                        <button type="button" class="btn-close p-2 mt-1 me-2" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`;
        insertHTML.innerHTML = html;

    }
}


// form data cullect
let display = new Display();
display.shownotes();


let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    e.preventDefault();
    let bookName = document.getElementById('bookName').value;
    let Author = document.getElementById('Author').value;
    let Type = document.querySelector('input[name=type]:checked').value;
   
    let book = new books(bookName, Author, Type);

    let notes = localStorage.getItem('booklist');
    let notesObj = [];
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    if (display.valied(book)) {
        notesObj.push(book);
        localStorage.setItem('booklist', JSON.stringify(notesObj));
        display.shownotes();
        display.show('success', 'your book added sucessfully');
    }
    else {
        display.show('warning', 'You insert invalied input');
        console.log('not valied');
    }
    document.getElementById('Author').value='';
    document.getElementById('bookName').value='';

})


// Delete function 
function delBtn(i) {
    let notes = localStorage.getItem('booklist');
    let notesObj = [];
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(i, 1);
    localStorage.setItem('booklist', JSON.stringify(notesObj));
    
    display.shownotes();
    display.show('success', 'your book sucessfully deleted');
}

// search text from search bar_________________________________________
let searchTxt= document.getElementById('searchTxt');
searchTxt.addEventListener('input', function (e) {
    
    let txt=document.getElementsByClassName('rows');
    Array.from(txt).forEach(function (e) {
        console.log(e);
        let tBookName=e.getElementsByClassName('tBookName')[0].innerText;
        
        let tAuthor=e.getElementsByClassName('tAuthor')[0].innerText;
        
        let tType=e.getElementsByClassName('tType')[0].innerText;
        if(tAuthor.toLowerCase().includes(searchTxt.value.toLowerCase()) || tBookName.toLowerCase().includes(searchTxt.value.toLowerCase()) || tType.toLowerCase().includes(searchTxt.value.toLowerCase())){
            e.style='';
        }
        else {
            e.style.display='none';
        }
    })
})