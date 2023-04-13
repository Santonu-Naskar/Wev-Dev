let LCM_field;
    let l= fetch("https://script.googleusercontent.com/macros/echo?user_content_key=60caBL7M9f9BHBejSAYDsSJW-f4lDZOl6RR3V_adP7SXpwY9nuKMg0rlPM8ojqsXz3YsNwed7XAhjdc5R_fG5FQfK8S1Ojszm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnDw0K0pM4UTzHxcrpF7AcC60Mjrx1qts287zt65aRaDy1kPH2iZFwTSL5KnW3w4p4OhKiKpHBRwdzJjgwt_Bhs00seidkzc6v9z9Jw9Md8uu&lib=M_vhpjLMipdUc6vDs04yFaXkwp4-0QaQ3");
    l.then((value)=>{
        return value.json()
    }).then((value)=>{
        LCM_field=JSON.parse(JSON.stringify(value.data));
        LCM_field.splice(0,1);
        console.log(value)
        console.log(Array.isArray(LCM_field))
        showLCM()
    })

    function showLCM() {
        let html2 = '';
        let fieldadd = document.getElementById('LCM')
        console.log(LCM_field)
        LCM_field.forEach(function (e, i) {
            // notesObj.find(obj => obj.title === e.title)
            html2 += `<option class="lcmoptions" value="${e.Mult}">${e.Icompany}</option>`
        })
        fieldadd.innerHTML += html2;
    }
    