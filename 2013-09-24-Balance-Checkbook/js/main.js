var name = prompt("Enter your full name, here!");
var init_balance = prompt("Enter your initial balance, here!");
var deposit1 = prompt("Enter your first deposit amount, here!");
var deposit2 = prompt("Enter your second deposit amount, here!");
var deposit3 = prompt("Enter your last deposit amount, here!");
var withdrawl1 = prompt("Enter your first withdrawl amount, here!");
var withdrawl2 = prompt("Enter your second withdrawl amount, here!");
var withdrawl3 = prompt("Enter your last withdrawl amount, here!");

init_balance = parseFloat(init_balance);
deposit1 = parseFloat(deposit1);
deposit2 = parseFloat(deposit2);
deposit3 = parseFloat(deposit3);
withdrawl1 = parseFloat(withdrawl1);
withdrawl2 = parseFloat(withdrawl2);
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
  final_balance = parseFloat(final_balance);

console.log("Your name is : " + name);
console.log("Your total balance is : " + final_balance);

debugger;

if(final_balance == 0)
  console.log("You're broke!");
else if(final_balance > 0)
  console.log("Have a nice day!");
else{
  final_balance += (-50);
  console.log("You have insufficient funds. A standard overdraft fee of $50.00 has been subtracted from your account.");
}

