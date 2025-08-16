// Base Elements
const dropdown = document.querySelectorAll(".dropdown select");
const button = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const swapBtn = document.querySelector(".fa-arrows-rotate"); // swap icon

// Load exchange rate on page load
window.addEventListener("load", () => {
  updateexchangeRate();
});

// Populate dropdowns with country list
for (let select of dropdown) {
  for (currcode in countryList) {
    let newoption = document.createElement("option");
    newoption.innerText = currcode;
    newoption.value = currcode;

    // Default values
    if (select.name == "from" && currcode == "USD") {
      newoption.selected = "selected";
    } else if (select.name == "to" && currcode == "INR") {
      newoption.selected = "selected";
    }
    select.append(newoption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// Update flag image when currency changes
const updateFlag = (element) => {
  let currcode = element.value;
  let countrycode = countryList[currcode];
  let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
};

// Handle button click
button.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateexchangeRate();
});

// Swap button functionality
swapBtn.addEventListener("click", () => {
  let temp = fromcurr.value;
  fromcurr.value = tocurr.value;
  tocurr.value = temp;

  // update flags after swap
  updateFlag(fromcurr);
  updateFlag(tocurr);

  updateexchangeRate();
});

// Fetch and update exchange rate
const updateexchangeRate = async () => {
  const from = fromcurr.value.toLowerCase();
  const to = tocurr.value.toLowerCase();

  let amount = document.querySelector(".amount input");
  let amtvalue = amount.value;

  if (amtvalue == "" || amtvalue <= 0) {
    alert("Please enter a valid amount");
    return;
  }

  msg.innerText = "Fetching latest rates... ⏳";

  const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`;

  try {
    let response = await fetch(url);
    let data = await response.json();
    let rate = data[from][to];

    let finalamount = (amtvalue * rate).toFixed(2);

    msg.innerText = `${amtvalue} ${fromcurr.value} = ${finalamount} ${tocurr.value}`;
  } catch (error) {
    msg.innerText = "Error fetching data ❌";
    console.error("Error:", error);
  }
};
