let myLeads = [];
let inp = document.getElementById("save-btn");
const inputEl = document.getElementById("input-el");
const listEl = document.getElementById("list");
const delEl = document.getElementById("del-btn");
const tabBtn = document.getElementById("save-tab");

const local_leads = JSON.parse(localStorage.getItem("myleads"));

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log(tabs[0].url);
    myLeads.push(tabs[0].url);
    localStorage.setItem("myleads", JSON.stringify(myLeads));
    render(myLeads);
  });
});
delEl.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});
if (local_leads) {
  myLeads = local_leads;
  render(myLeads);
}
function render(leads) {
  //minimum use of dom
  let items = "";
  for (let i = 0; i < leads.length; ++i) {
    //template strings
    items += `<li>
      <a target='_blank' href='${myLeads[i]}'>
        ${myLeads[i]} 
      </a>
    </li>`;
  }
  listEl.innerHTML = items;
  localStorage.setItem("myleads", JSON.stringify(leads));
  //console.log(localStorage.getItem("myleads"));
}
//now add event listner
inp.addEventListener("click", function () {
  //write function here
  myLeads.push(inputEl.value);
  //clear out input feild
  inputEl.value = "";

  //storing array in localstorage
  localStorage.setItem("myleads", JSON.stringify(myLeads));
  console.log(localStorage.getItem("myleads"));
  render(myLeads);
});
