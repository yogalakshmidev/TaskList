const currencyHolder=document.getElementById("currency");
const balanceHolder=document.getElementById("balance");
const totalIncomeTrans = document.getElementById("balanceTotalIncome");
const totalExpenseTrans = document.getElementById("balanceTotalExpense");

const tnxNameHolder=document.getElementById("name");
const tnxAmountHolder=document.getElementById("amount");

// const netbalance=document.getElementById("netBalance");
const income=document.getElementById("income");
const expense=document.getElementById("expense");

const addButton=document.getElementById("addNewTrans");
const saveButton=document.getElementById("save");
const cancelButton=document.getElementById("cancel");
const displayList=document.getElementById("list_of_transactions");

let symbol="$";
let listOfTransactions = [];
let currentBalance = 0;
let incomeBalance = 0;
let expenseBalance = 0; 
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
saveButton.style.display="block";
addButton.style.display="none";
}
function del(i){
  const isConfirmed = confirm('Are you sure you want to delete this transaction?');
  if (!isConfirmed) {
      return;
  } else {

  listOfTransactions = listOfTransactions.filter((e,index) => i !== index);
  render();
  }
}
function addData(){
  
    localStorage.setItem("symbol",symbol);
    localStorage.setItem("balance",currentBalance);
    localStorage.setItem("balanceTotalIncome",incomeBalance);
    localStorage.setItem("balanceTotalExpense",expenseBalance);
    localStorage.setItem("list",JSON.stringify(listOfTransactions));
  
}

function saveData(){
  localStorage.setItem("symbol",symbol);
  localStorage.setItem("balance",currentBalance);
  localStorage.setItem("balanceTotalIncome",incomeBalance);
 localStorage.setItem("balanceTotalExpense",expenseBalance);
  localStorage.setItem("list",JSON.stringify(listOfTransactions));
}
const expenseTotal = 0;
const incomeTotal=0;
function render(){
   currentBalance =  listOfTransactions.reduce((total,value)=>{
    
  if(value.type == "expense"){
    
    expenseBalance=expenseTotal+ value.amount;
    
    console.log("current expense value is"+expenseTotal);

    return total - value.amount;
  }
  if(value.type == "income"){
    
    incomeBalance = incomeTotal + value.amount;
  console.log("current income value is",incomeBalance);
  return total + value.amount;
  }
    //  return value.type == "expense" ? total - value.amount : total + value.amount
  }, 0)
    displayList.innerHTML="";
    saveButton.style.display="none";
    

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
  totalIncomeTrans.innerHTML=incomeBalance;
  totalExpenseTrans.innerHTML=expenseBalance;


  saveData();

}

cancelButton.addEventListener("click",()=>{
  editIndex=-1;
  // listOfTransactions.push(transaction);
  tnxNameHolder.value="";
  tnxAmountHolder.value="";
  income.checked=false;
  expense.checked=false;
  
  cancelButton.style.display="none";
  saveButton.style.display="none";
  addButton.style.display="block";
})

saveButton.addEventListener("click",()=>{
  if(tnxNameHolder.value == "" || Number(tnxAmountHolder.value) <=0){
    
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
  income.checked=false;
  expense.checked=false;
  

  render();
  cancelButton.style.display="none";
  saveButton.style.display="none";
  addButton.style.display="block";

})



addButton.addEventListener("click",()=>{
  if(tnxNameHolder.value == "" || Number(tnxAmountHolder.value) <=0){
    alert("Please enter all the fields");
    // console.log("Please enter proper transaction");
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
  income.checked=false;
  expense.checked=false;
  
  render();
  cancelButton.style.display="none";
  saveButton.style.display="none";
  addButton.style.display="block";

})

render();
