//const base_url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdown=document.querySelectorAll(".dropdown select");
const button=document.querySelector("form button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");


window.addEventListener("load",()=>{
updateexchangeRate();
});



for(let select of dropdown){
for(currcode in countryList){
    let newoption=document.createElement("option");   
    newoption.innerText=currcode;
    newoption.value=currcode;
    if(select.name=="from" && currcode=="USD"){
        newoption.selected="selected";
    }else if(select.name=="to" && currcode=="INR"){
        newoption.selected="selected";
    }
    select.append(newoption); 
    }
select.addEventListener("change",(evt)=>{
updateFlag(evt.target);
});
}
const updateFlag=(element)=>{
    let currcode=element.value;
    let countrycode=countryList[currcode];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
};

button.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateexchangeRate();
   
});

const updateexchangeRate=async()=>{
     const from = fromcurr.value.toLowerCase();
    const to = tocurr.value.toLowerCase();

    let amount=document.querySelector(".amount input");
    let amtvalue=amount.value;
    if(amtvalue=="" || amtvalue<=0){
        alert("Please enter a valid amount");
        return;
    }
    const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`;

        let response = await fetch(url);
        let data = await response.json();
        let rate = data[from][to];
        console.log(rate);
        let finalamount = (amtvalue * rate);
        msg.innerText = `${amtvalue} ${fromcurr.value} =${finalamount} ${tocurr.value}`;
}