var name = prompt("Enter your full name, here!");
var init_balance = prompt("Enter your initial balance, here!");
  init_balance = parseFloat(init_balance);
var deposit1 = prompt("Enter your first deposit amount, here!");
  deposit1 = parseFloat(deposit1);
var deposit2 = prompt("Enter your next deposit amount, here!");
  deposit2 = parseFloat(deposit2);
var deposit3 = prompt("Enter your last deposit amount, here!");
  deposit3 = parseFloat(deposit3);
var withdrawl1 = prompt("Enter your first withdrawl amount, here!");
  withdrawl1 = parseFloat(withdrawl1);
var withdrawl2 = prompt("Enter your next withdrawl amount, here!");
  withdrawl2 = parseFloat(withdrawl2);
var withdrawl3 = prompt("Enter your last withdrawl amount, here!");
  withdrawl3 = parseFloat(withdrawl3);

var total_deposit = 0;
total_deposit += deposit1;
total_deposit += deposit2;
total_deposit += deposit3;

var total_withdrawl = 0;
total_withdrawl += withdrawl1;
total_withdrawl += withdrawl2;
total_withdrawl += withdrawl3;

var final_balance = ((init_balance + total_deposit) - total_withdrawl)

console.log("Your name is : " + name);
console.log("Your total balance is : " + final_balance);

if(final_balance == 0)
  console.log("You're broke!");
else if(final_balance > 0)
  console.log("Have a nice day!");
else{
    final_balance += (-50);
    console.log("You have insufficient funds. A standard fee of $50.00 has been subtracted from your account.");
  }
