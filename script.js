const budgetInput = document.getElementById('budgetInput');
const expenseInput = document.getElementById('expenseInput');
const amountInput = document.getElementById('amountInput');
const expenseList = document.getElementById('expenseList');
const totalAmountDisplay = document.getElementById('totalAmount');

let budget = 0;
let expenses = [];

function setBudget() {
  budget = parseFloat(budgetInput.value);
  if (isNaN(budget) || budget <= 0) {
    alert('Please enter a valid budget.');
    return;
  }
  budgetInput.value = '';
  updateBudgetDisplay();
}

function addExpense() {
  const expenseName = expenseInput.value.trim();
  const expenseAmount = parseFloat(amountInput.value);
  if (expenseName === '' || isNaN(expenseAmount) || expenseAmount <= 0) {
    alert('Please enter a valid expense name and amount.');
    return;
  }

  const expense = {
    name: expenseName,
    amount: expenseAmount
  };

  expenses.push(expense);
  updateExpenseList();
  updateTotalExpense();
  expenseInput.value = '';
  amountInput.value = '';
  getBudgetText();
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  updateExpenseList();
  updateTotalExpense();
  getBudgetText();
}
function updateBudgetDisplay() {
  const budgetDisplay = document.getElementById('budgetDisplay');
  budgetDisplay.textContent = `Budget: £${budget.toFixed(2)}`;
  getBudgetText();
}
function getBudgetText() {
  const budgetDisplay = document.getElementById('budgetDisplay');
  const budgetText = budgetDisplay.innerText.slice(8);
  const budgetValue = parseFloat(budgetText.replace(/[^\d.-]/g, ''));

  const totalAmountDisplay = document.getElementById('totalAmount');
  const totalAmountText = totalAmountDisplay.innerText.slice(1);
  const totalAmount = parseFloat(totalAmountText.replace(/[^\d.-]/g, ''));

  if (isNaN(budgetValue) || isNaN(totalAmount)) {
    console.log("Invalid budgetValue or totalAmount.");
    return;
  }

  const difference = budgetValue - totalAmount;

  const overall = document.getElementById('OverallScreen');
  overall.innerText = `Money left: £${difference.toFixed(2)}`;
}


function updateExpenseList() {
  expenseList.innerHTML = '';
  for (const [index, expense] of expenses.entries()) {
    const li = document.createElement('li');
    const rowColor = index % 2 === 0 ? 'lightgray' : 'white'; // Alternating row colors
    li.innerHTML = `
      <span class="expense-name">${expense.name}</span>
      <span class="expense-amount">£${expense.amount.toFixed(2)}</span>
      <button onclick="deleteExpense(${index})" id="DeletionButton">Delete</button>
    `;
    li.style.backgroundColor = rowColor; // Set the background color for the row
    expenseList.appendChild(li);
  }
}

function updateTotalExpense() {
  const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);
  totalAmountDisplay.textContent = `£${totalExpense.toFixed(2)}`;
}
