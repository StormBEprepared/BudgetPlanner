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
  //expenseInput.value = '';
  //amountInput.value = '';
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  updateExpenseList();
  updateTotalExpense();
}

function updateBudgetDisplay() {
  const budgetDisplay = document.getElementById('budgetDisplay');
  budgetDisplay.textContent = `Budget: £${budget.toFixed(2)}`;
}

function updateExpenseList() {
  expenseList.innerHTML = '';
  for (const expense of expenses) {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="expense-name">${expense.name}</span>
      <span class="expense-amount">£${expense.amount.toFixed(2)}</span>
      <button onclick="deleteExpense(${expenses.indexOf(expense)})">Delete</button>
    `;
    expenseList.appendChild(li);
  }
}

function updateTotalExpense() {
  const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);
  totalAmountDisplay.textContent = `£${totalExpense.toFixed(2)}`;
}
