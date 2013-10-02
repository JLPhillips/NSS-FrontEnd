$(document).ready(initialize)

function deposit(original, amountadded){
  var balance = 0;
  balance += original;
  balance = parseFloat(balance);
  return balance += amountadded;
}

function withdraw(original, amountsubtracted){
  var balance = 0;
  balance += original;
  balance = parseFloat(balance);
  return balance -= amountsubtracted;
}

function add_deposit(){
  var balance_amount = $("#money").text();
  var deposit_amount = $("#field").val();
  balance_amount = parseFloat(balance_amount);
  deposit_amount = parseFloat(deposit_amount);
  var deposit_add = parseFloat(balance_amount += deposit_amount);
  $("#money").text(deposit_add);
  if($("#money").text() < 0){
    $("#money").css("background-color", "red");
    alert("Funds are still insufficient.");
    }
  else
    $("#money").css("background-color", "white");
}

function take_withdraw(){
  var balance_amount = $("#money").text();
  var withdraw_amount = $("#field").val();
  balance_amount = parseFloat(balance_amount);
  withdraw_amount = parseFloat(withdraw_amount);
  var withdraw_subtract = parseFloat(balance_amount -= withdraw_amount);
  $("#money").text(withdraw_subtract);
  if($("#money").text() < 0){
    $("#money").css("background-color", "red");
    alert("You have insufficient funds.");
    }
  else
    $("#money").css("background-color", "white");
}

function initialize(){
$("#deposit").click(add_deposit);
$("#withdraw").click(take_withdraw);





}