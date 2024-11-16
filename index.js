const currencyHolder=document.getElementById("currency");
const balanceHolder=document.getElementById("balance");

const tnxNameHolder=document.getElementById("name");
const tnxAmountHolder=document.getElementById("amount");

const income=document.getElementById("income");
const expense=document.getElementById("expense");

const saveButton=document.getElementById("save");
const cancelButton=document.getElementById("cancel");
const displayList=document.getElementById("list_of_transactions");

let symbol="$";
let listOfTransactions = [];
let currentBalance = 0;
let editIndex = -1;

function edit(i){
  editIndex = i;
tnxNameHolder.value = listOfTransactions[i].name;
tnxAmountHolder.value = listOfTransactions[i].amount;
if(listOfTransactions[i].type == "income"){
  income.checked = true;
}
else{
  expense.checked = true;
}
cancelButton.style.display="block";
}
function del(i){
  listOfTransactions = listOfTransactions.filter((e,index) => i !== index);
  render();
}

function saveData(){
  localStorage.setItem("symbol",symbol);
  localStorage.setItem("balance",currentBalance);
  localStorage.setItem("list",JSON.stringify(listOfTransactions));
}
function render(){
   currentBalance =  listOfTransactions.reduce((total,value)=>{
    return value.type == "expense" ? total - value.amount : total + value.amount
  }, 0)

    displayList.innerHTML="";

    if(listOfTransactions.length == 0){
      displayList.innerHTML +="No Transactions found"
    }

    else{
      listOfTransactions.forEach((e,i) =>{
        displayList.innerHTML +=` 
        <li class="transaction ${e.type}">
          <p>${e.name}</p>
          <div class="right_side">
            <p>${symbol}${e.amount}</p>
            <button onclick="edit(${i})"><i class="fa-regular fa-pen-to-square"></i></button>
            <button onclick="del(${i})"><i class="fa-solid fa-trash"></i></button>
          </div>
        </li>
        `;
      })
    }


  currencyHolder.innerHTML = symbol;
  balanceHolder.innerHTML = currentBalance;
  saveData();

}

cancelButton.addEventListener("click",()=>{
  editIndex=-1;
  // listOfTransactions.push(transaction);
  tnxNameHolder.value="";
  tnxAmountHolder.value="";
  cancelButton.style.display="none";
})

saveButton.addEventListener("click",()=>{
  if(tnxNameHolder.value == "" || Number(tnxAmountHolder.value) <=0){
    console.log("Please enter proper transaction");
    return;
  }
  let transaction = {
    name: tnxNameHolder.value,
    amount:Number(tnxAmountHolder.value),
    type:income.checked? "income" :"expense"

  };
  console.log(transaction);
if(editIndex == -1){ 
  listOfTransactions.push(transaction);
}
else{
  listOfTransactions[editIndex]=transaction;
  }

  editIndex=-1;
  // listOfTransactions.push(transaction);
  tnxNameHolder.value="";
  tnxAmountHolder.value="";
  render();
  cancelButton.style.display="none";

})

loadData();
render();
