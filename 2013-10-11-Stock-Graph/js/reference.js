"use strict";
// online
var Δdb;
var Δstocks;
var Δbalance;

// // local
var db = {};
var stocks = [];
var symarray = [];



$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase("https://stock-market-graph-jlp.firebaseio.com/");
  Δstocks = Δdb.child("stocks");
  Δbalance = Δdb.child("balance");

  Δstocks.on("child_added", updateRows);
  Δbalance.on("value", updateBalance);
  $("#buy").click(purchase);
  $("#setbalance").click(setBalance);
  $("#settime").click(startClock);
}

function startClock(){
  setInterval(updatePrice, $("#interval").val() * 1000);
  grayOut($("#interval"));
}

function updatePrice(){
  for(var i = 0; i < symarray.length; i++){
    requestQuote(symarray[i], updateCurrent);
  }
}

function updateCurrent(data){
  var stock = data.Data;
  var price = parseFloat(stock.LastPrice);
  var symbol = "." + stock.Symbol;
  var $quotelog = $(symbol).prev().prev().prev();
  var quote = parseFloat($quotelog.text());
  $(symbol).text("$" + (price).toFixed(2));
  if(price < quote){
    $(symbol).addClass("red");
  }else{
    $(symbol).addClass("green");
  }
}

function updateRows(snapshot){
  var stock = snapshot.val();
  var symbol = stock.symbol;
  addRow(stock);
  stocks.push(stock);
  symarray.push(symbol);
}

function purchase(){
  var symbol = $("#symbol").val();
  var quantity = $("#quantity").val();
  quantity = parseInt(quantity, 10);

  requestQuote(symbol, function(data){
    var quote = data.Data;

    if(quote.LastPrice * quantity <= db.balance.amount){
      db.balance.amount -= quote.LastPrice * quantity;
      db.balance.stock += quote.LastPrice * quantity;
      db.balance.total = db.balance.amount + db.balance.stock;
      Δbalance.update(db.balance);
    }

    var stock = {};
    stock.name = quote.Name;
    stock.symbol = symbol;
    stock.purchasePrice = quote.LastPrice;
    stock.quantity = quantity;
    Δstocks.push(stock);

    $("#symbol").val("").focus();
    $("#quantity").val("");
  });
}

function requestQuote(symbol, fn){
  var data = {symbol: symbol};
  $.getJSON("http://dev.markitondemand.com/Api/Quote/jsonp?callback=?", data, fn);
}

function setBalance(){
  var amount = parseFloat($("#amount").val());
  var balance = {};
  balance.total = 0;
  balance.stock = 0;
  balance.amount = amount;
  Δbalance.set(balance);

  grayOut($("#amount"));
}

function updateBalance(snapshot){
  var balance = snapshot.val();
  db.balance = balance;
  Δbalance.update(balance);
  $("#dollaramount").text((db.balance.amount).toFixed(2));
  $("#totaldollars").text((db.balance.total).toFixed(2));

  if($("#dollaramount").text() > 0){
    grayOut($("#amount"));
  }
}

function grayOut(selector){
  selector.css("background-color", "#e3e3e3").css("border", "none").css("color", "#e3e3e3");
  selector.attr("readonly", "true");
}

function addRow(stock){
  var row = "<tr><td class='name'></td><td class='symbol'></td><td class='quote'></td><td class='purchased'></td><td class='total'></td><td class='current'></td></tr>";
  var $row = $(row);

  $row.children(".name").text(stock.name);
  $row.children(".symbol").text(stock.symbol);
  $row.children(".quote").text((stock.purchasePrice).toFixed(2));
  $row.children(".purchased").text(stock.quantity);
  $row.children(".total").text((stock.purchasePrice * stock.quantity).toFixed(2));
  $row.children(".current").addClass(stock.symbol);

  $("#stocks").append($row);
}