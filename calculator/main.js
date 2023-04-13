let notesObj = [];
let field;
let a = fetch("https://script.googleusercontent.com/macros/echo?user_content_key=NUOuB9SzB4ALRGwdGvOlsw9ylpVevcOS-z7xIIQB2YKCwrkciIx8Gqu1DZzlQ9dwsJl_cuvA9hcUriduI_2YHf1xja33gcb3m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnKd73UIOn0IOQ0CGjIfP-Qa3cfD4HgjQDvCP_JWHd7GF8F4RZwMgUlFbN6I_X5PC7Itt80AYOYENiSJhS4uePmS4TS8uGSRoutz9Jw9Md8uu&lib=MMJHdJT0kswP7CD_ptX_163kwp4-0QaQ3");
a.then((value) => {
    return value.json()
}).then((value) => {
    field = JSON.parse(JSON.stringify(value.data));
    field.splice(0, 1);
    console.log(value)
    console.log(Array.isArray(field))
    showFields()
})



function showFields() {
    let html2 = '';
    let fieldadd = document.getElementById('fields')
    console.log(field)

    field.forEach(function (e, i) {
        // notesObj.find(obj => obj.title === e.title)
        html2 += `<div id="${i}" onclick="showinputField(this.id)" class="btn-field">${e.Company}</div>`
    })
    fieldadd.innerHTML = `<div id="nosearch" class="displaynone">Search Not found</div>`+html2;
}


// display after inpt
function showNotes() {
    let html = '';

    notesObj.forEach(function (e, i) {
        let a = [i, e.sind]
        html += `<div class="items" style="width:100%;">
                    <div class="classstore node">${field[e.sind].Class}</div>
                    <div class="descstore node"><p class="overflow">${e.stitle}</p></div>
                    <div class="amountstore node">${e.svalue}</div>
                    <div class="btn2" id="${a}" onclick="deleteNote(this.id)">&times;</div>
                </div>
      `
    })
    let notesadd = document.getElementById('storefields');
    if (notesObj.length != 0) {
        notesadd.innerHTML = `
        <div class="items style="width:100%;"">
            <div class="classstorehead head">Code</div>
            <div class="descstorehead head">Class Description</div>
            <div class="amountstorehead head">Amount</div>
        </div>`+ html;
    }
    else {
        notesadd.innerHTML = ``;
    }
}
function deleteNote(i) {
    let a = i.split(",")
    notesObj.splice(a[0], 1);
    sessionStorage.setItem('notes', JSON.stringify(notesObj));
    console.log(a);
    let disablefield = document.getElementById(`${a[1]}`);
    disablefield.classList.remove("disable");
    showNotes();
}


let fielshow = document.getElementById('fieldshow')

function visible() {
    fielshow.classList.add("visible");
}

function hidefield() {
    fielshow.classList.remove("visible");
}


// show input box with one field
let inputFieldadd = document.getElementById('inputFields')
function showinputField(i) {
    let x = field[i].Company;
    inputFieldadd.innerHTML = `<span class="stitle">${x}</span> <input type="number" id="addvalue" placeholder="Enter remuneration">  <div class="btnadd" id=${i} onclick="storefield(this.id)" >ADD FIELD</div>`
    inputFieldadd.classList.add("visible");
    hidefield();
}

// store and display fields with value
function storefield(i) {
    console.log("stored");
    let disablefield = document.getElementById(`${i}`);
    disablefield.classList.add("disable")
    let stitle = field[i].Company;
    let rate = field[i].rate;
    let sind = i;
    let addvalue = document.getElementById('addvalue');
    if (addvalue.value == '') {
        inputFieldadd.innerHTML = `<span class="stitle">${stitle}</span> <span class="flextype" ><input type="number" class="input1" id="addvalue" placeholder=" enter value input"><span class="invalid">Please enter an amount</span> </span>  <div class="btnadd" id=${i} onclick="storefield(this.id)" >Add field</div> `
        return 0;
    }
    let svalue = addvalue.value;
    notesObj.push({ stitle, svalue, sind, rate });
    sessionStorage.setItem('notes', JSON.stringify(notesObj));
    addvalue.value = '';
    inputFieldadd.classList.remove("visible");
    showNotes();
}




// sEARCH txt made
let searchTxt = document.getElementById('searchTxt');
searchTxt.addEventListener('input', function (e) {
    let fieldadd = document.getElementById('nosearch')
    fieldadd.classList.add("displaynone")
    let x = 0;
    let txt = document.getElementsByClassName('btn-field');
    Array.from(txt).forEach(function (e) {
        let itxt = e.innerText;
        if (itxt.toLowerCase().includes(searchTxt.value.toLowerCase())) {
            e.style.display = 'block';
            x = 1;
        }
        else {
            e.style.display = 'none';
        }
    })
    if (x == 0) {
    fieldadd.classList.remove("displaynone")
    }
})

// const search = () => {
//     let searchTxt = document.getElementById('searchTxt');
//     let x = 0;
//     let txt = document.getElementsByClassName('btn-field');
//     Array.from(txt).forEach(function (e) {
//         let itxt = e.innerText;
//         if (itxt.toLowerCase().includes(searchTxt.value.toLowerCase())) {
//             e.style.display = 'block';
//             x = 1;
//         }
//         else {
//             e.style.display = 'none';
//         }
//     })
//     if (x == 0) {
//         let fieldadd = document.getElementById('fields')

//         html2 = `Search Not found`;
//         fieldadd.innerHTML = html2;
//     }
// }








