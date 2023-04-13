var form = document.getElementById("myForm");
    function handleForm(event) { event.preventDefault(); }
    form.addEventListener('submit', handleForm);

function myFunction() {
    if(notesObj.length ==0){
        let notesadd = document.getElementById('storefields');
        notesadd.innerHTML = `<span style="color:red;">ADD Atleast 1 class code for calculate</span>`;
        return 0;
    }
    date = document.getElementById('inputDate').value;
    ExperianceMod = document.getElementById('experianceMod').value
    lcm = document.getElementById('LCM').value
    DeductableAmount = parseInt(document.getElementById('DeductableAmount').value)
    WC_hazardGroup = parseInt(document.getElementById('WChazardGroup').value)
    safetyCredit = document.getElementById('safetyCredit').checked;
    DiscountType = document.getElementById('DiscountType').value
    CreditorDebit = parseFloat(document.getElementById('CreditorDebit').value)
    ConstructionCredit = parseFloat(document.getElementById('ConstructionCredit').value)
    IncreasedLimits =parseInt(document.getElementById('IncreasedLimits').value)
    Discount = document.getElementById('Discount').checked;
    DiscountOverride = document.getElementById('DiscountOverride').value
    ExpenceConstant = document.getElementById('ExpenceConstant').value
    // console.log(experiance);
    // console.log(lcm)
    // console.log(DeductableAmount)
    // console.log(WC_hazardGroup)
    // console.log(safetyCredit)
    // console.log(DiscountType)
    // console.log(CreditorDebit)
    // console.log(typeof(IncreasedLimits))
    // console.log(Discount)
    // console.log(ExpenceConstant)
    let totalPaylode=0;
    let ManualPremium=0;
    nodeout = document.getElementById('nodeout')
    totalPaylodeout = document.getElementById('totalPaylode')
    nodeout = document.getElementById('nodeout')
    html=`<div class="items">
    <div class="code head">Code</div>
    <div class="ClassDesc head">Class Description</div>
    <div class="Payroll head">Payroll</div>
    <div class="Rate head">Rate</div>
    <div class="Premium head">Premium</div>
</div>`
    notesObj.forEach(function (e, i) {
        html+=`<div class="items">
                    <div class="code node">${field[e.sind].Class}</div>
                    <div class="ClassDesc node"><p class="overflow">${e.stitle}</p></div>
                    <div class="Payroll node">${e.svalue}</div>
                    <div class="Rate node">${e.rate}</div>
                    <div class="Premium node">${Math.round((parseInt(e.svalue) * (Math.round((lcm * parseFloat(e.rate))*100)/100))/100)}</div>
                </div>
                `
        totalPaylode = totalPaylode +parseInt(e.svalue);
        ManualPremium = ManualPremium + Math.round((parseInt(e.svalue) * (Math.round((lcm * parseFloat(e.rate))*100)/100))/100);
    })
    nodeout.innerHTML=html;
    const LimitsCharge = IncreasedLimits === 500 ? 0.019 : (IncreasedLimits === 1000 ? 0.033 : 0);
    const LimitsChargecal=Math.round(LimitsCharge*ManualPremium);
    const Modifiable_Premium = Math.round(ManualPremium * (1 + LimitsCharge));
    const expmodcalval=Math.round(Modifiable_Premium * (ExperianceMod-1))
    const ModifiedPremium =expmodcalval  +Modifiable_Premium;
    const ScheduleCreditorDebit= CreditorDebit<0? Math.round(-CreditorDebit * ModifiedPremium):-Math.round(CreditorDebit * ModifiedPremium);
    const Subtotal = ModifiedPremium +ScheduleCreditorDebit;
    const DeductibleCredit = {
        0: [0, 0, 0, 0, 0],
        1000: [0, 0.0770, 0.0750, 0.0410, 0.0240],
        5000: [0, 0.2340, 0.2260, 0.1680, 0.1390],
        10000: [0, 0.3150, 0.3010, 0.2300, 0.1850]
    }
    const ConstructionCreditCalculate=ConstructionCredit<0?Math.round(-(ConstructionCredit * Subtotal)):-Math.round((ConstructionCredit * Subtotal))
    const DeductibleCreditval=Math.round((DeductibleCredit[DeductableAmount][WC_hazardGroup] * Subtotal));
    const Subtotal2 =Subtotal+ ConstructionCreditCalculate - DeductibleCreditval;
    const mulSub3=(DiscountOverride===0?(Discount=="yes"?(DiscountType=="mutual"?ROUND((Subtotal2<=5000?0:(Subtotal2<=100000?((Subtotal2-5000)*0.035/Subtotal2):(Subtotal2<=500000?(((Subtotal2-100000)*0.05+3300)/Subtotal2):(((Subtotal2-500000)*0.07+23500)/Subtotal2)))),3):ROUND((Subtotal2<=5000?0:(Subtotal2<=100000?((Subtotal2-5000)*0.109/Subtotal2):(Subtotal2<=500000?(((Subtotal2-100000)*0.126+10400)/Subtotal2):(((Subtotal2-500000)*0.144+61000)/Subtotal2)))),3)):"na"):DiscountOverride);
    const mulSub3val= Math.round(mulSub3*Subtotal2);
    const Subtotal3 =Subtotal2- mulSub3val;
    const ForeignTerrorism= Math.round(0.0002*totalPaylode);
    const DomesticTerrorism=Math.round(0.0001*totalPaylode);
    const TotalEstimatedAnnualPremium=Subtotal3+ForeignTerrorism+DomesticTerrorism;
    const PAAssessment=Math.round(0.0225*TotalEstimatedAnnualPremium);
    const ExpenseConstan=160;
    const TotalEstimatedCost=TotalEstimatedAnnualPremium+PAAssessment+ExpenseConstan;
    console.log(mulSub3);
    console.log(mulSub3val);
    document.getElementById('totalPaylode').innerText=`$ ${totalPaylode}`
    document.getElementById('ManualPremium').innerText=`$ ${ManualPremium}`;
    document.getElementById('LimitsCharge').innerText=LimitsCharge;
    document.getElementById('LimitsChargecal').innerText=`$ ${LimitsChargecal}`;
    document.getElementById('Modifiable_Premium').innerText=`$ ${Modifiable_Premium}`;
    document.getElementById('expmodcal').innerText=ExperianceMod;
    document.getElementById('expmodcalval').innerText=`$ ${expmodcalval}`;
    document.getElementById('ModifiedPremium').innerText=`$ ${ModifiedPremium}`;
    document.getElementById('credit/debit').innerText=CreditorDebit;
    document.getElementById('ScheduleCreditorDebit').innerText=`$ ${ScheduleCreditorDebit}`;
    document.getElementById('Subtotal').innerText=`$ ${Subtotal}`;

    document.getElementById('safetycredit').innerText=safetyCredit? "0.02%": "Na";
    document.getElementById('safetycreditval').innerText=`$ ${Subtotal*0.02}`;
    document.getElementById('DeductibleCredit').innerText=DeductibleCredit[DeductableAmount][WC_hazardGroup];
    document.getElementById('DeductibleCreditval').innerText=`$ ${DeductibleCreditval}`;
    document.getElementById('ConstructionCreditCal').innerText=ConstructionCredit;
    document.getElementById('ConstructionCreditval').innerText=`$ ${ConstructionCreditCalculate}`;
    document.getElementById('Subtotal2').innerText=`$ ${Subtotal2}`;

    document.getElementById('mulSub3').innerText=mulSub3;
    document.getElementById('mulSub3val').innerText=`$ ${mulSub3val}`;
    document.getElementById('Subtotal3').innerText=`$ ${Subtotal3}`;

    document.getElementById('ForeignTerrorism').innerText=`$ ${ForeignTerrorism}`;
    document.getElementById('DomesticTerrorism').innerText=`$ ${DomesticTerrorism}`;
    document.getElementById('TotalEstimatedAnnualPremium').innerText=`$ ${TotalEstimatedAnnualPremium}`;

    document.getElementById('PAAssessment').innerText=`$ ${PAAssessment}`;
    document.getElementById('ExpenseConstan').innerText=`$ ${ExpenseConstan}`;
    document.getElementById('AgencyManagementFee').innerText=`$ ${0}`;
    document.getElementById('TotalEstimatedCost').innerText=`$ ${TotalEstimatedCost}`;

    document.getElementById('credit/debit').classList.remove("none");
    document.getElementById('LimitsCharge').classList.remove("none");
    document.getElementById('expmodcal').classList.remove("none");

    document.getElementById('safetycredit').classList.remove("none");
    document.getElementById('DeductibleCredit').classList.remove("none");
    document.getElementById('ConstructionCreditCal').classList.remove("none");
    document.getElementById('mulSub3').classList.remove("none");
    const vdate=date.split("-")
    document.getElementById('outputDate').innerText=vdate[2]+"-"+vdate[1]+"-"+vdate[0];
}
