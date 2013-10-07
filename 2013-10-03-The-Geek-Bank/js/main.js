"use strict";
$(document).ready(initialize);

function initialize(){
  $("#logoButton").click(addLogo);
  $("#balanceButton").click(addBalance);
  $("#depositButton").click(addDeposit);
  $("#withdrawButton").click(addWithdraw);
  $("#depositlist").on("click", ".listyle", undoDeposit);
  $("#withdrawlist").on("click", ".listyle", undoWithdraw);
}

function addLogo(){
  var $url = $("#logoField").val();
  $(".logo").css("background", "url(" + $url + ")", "no-repeat");
  $(".logo").css("background-size", "100px", "100px");
  $("#logoButton").hide();
  $("#logoField").hide();
  $("#balanceField").focus();
}

function addBalance(){
  var $amount = $("#balanceField").val();
  $amount = parseFloat($amount);
  $("#amount").text($amount);
  $("#balanceButton").hide();
  $("#balanceField").hide();
  $("#actionField").focus();
}

function addDeposit(){
  // debugger;
  var $oldamount = $("#amount").text();
  $oldamount = parseFloat($oldamount);
  var $newamount = $("#actionField").val();
  $newamount = parseFloat($newamount);
  var $action = 0;
  $action += ($oldamount + $newamount);
  $("#amount").text($action);

  var $deposits = $("<li>");
  $deposits.addClass("listyle");
  $deposits.text($newamount);
  $("#depositlist").append($deposits);
  $("#actionField").focus();

  if($action < 0){
    $("#balance").css("background-color", "red");
    alert("Funds still insufficient.");
  }
  else
    {$("#balance").css("background-color", "white");}
}

function addWithdraw(){
  // debugger;
  var $oldamount = $("#amount").text();
  $oldamount = parseFloat($oldamount);
  var $newamount = $("#actionField").val();
  $newamount = parseFloat($newamount);
  var $action = 0;
  $action += ($oldamount - $newamount);
  $("#amount").text($action);
  $("#actionField").focus();

  var $withdraws = $("<li>");
  $withdraws.addClass("listyle");
  $withdraws.text($newamount);
  $("#withdrawlist").append($withdraws);
  $("#actionField").focus();

  if($action < 0){
    $("#balance").css("background-color", "red");
    alert("Insufficient Funds");
  }
  else
    {$("#balance").css("background-color", "white");}
}

function undoDeposit(){
  // debugger;
  var $item = $(this);
  var amount = parseFloat($item.text());
  var $oldamount = $("#amount").text();
  $oldamount = parseFloat($oldamount);
  var $action = 0;
  $action += ($oldamount - amount);
  $action = parseFloat($action);
  $("#amount").text($action);
  $item.remove();

  if($action < 0){
    $("#balance").css("background-color", "red");
  }
  else
    {$("#balance").css("background-color", "white");}
}

function undoWithdraw(){
  var $item = $(this);
  var amount = parseFloat($item.text());
  var $oldamount = $("#amount").text();
  $oldamount = parseFloat($oldamount);
  var $action = 0;
  $action += ($oldamount + amount);
  $action = parseFloat($action);
  $("#amount").text($action);
  $item.remove();
  if($action < 0){
    $("#balance").css("background-color", "red");
  }
  else
    {$("#balance").css("background-color", "white");}
}