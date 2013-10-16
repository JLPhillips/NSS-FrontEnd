"use strict";
$(document).ready(initialize);

// ---------------------------------------------------------------Designation--------------------->

var Δdb;
var Δbalance;
var Δstocks;
var Δphotos = [];

var db = {};
var stocks = [];
var symarray = [];

// -----------------------------------------------------------Initialize Functions------------------->

function initialize(){
  $(document).foundation();
  Δdb = new Firebase("https://stock-market-graph-jlp.firebaseio.com/");
  Δstocks = Δdb.child("stocks");
  Δbalance = Δdb.child("balance");

  $("#setbalance").click(setBalance);
  $("#buy").click(purchase);
  // $("#settime").click(startClock);

  Δbalance.on("value", updateBalance);
  Δstocks.on("child_added", updateRows);
  $("#innergraphbox").on("dblclick", ".graph", reverseBuy);
}

// ------------------------------------------------------------------Balance----------------->

function setBalance(){
  var amount = parseFloat($("#amount").val());
  var balance = {};
  balance.amount = amount;
  Δbalance.set(balance);

  grayOut($("#amount"));
  alert("Balance set at $" + amount.toFixed(2) + ".");
}

function updateBalance(snapshot){
  var balance = snapshot.val();
  db.balance = balance;
  Δbalance.update(balance);
  $("#dollaramount").text((db.balance.amount).toFixed(2));

  if($("#dollaramount").text() > 0){
    grayOut($("#amount"));
  }
}

function grayOut(selector){
  selector.css("background-color", "#e3e3e3").css("border", "none").css("color", "#e3e3e3");
  selector.attr("readonly", "true");
}

// -------------------------------------------------------------------------------Clock--------------->

// function startClock(){
//   setInterval(updatePrice, $("#interval").val() * 1000);
//   grayOut($("#interval"));
// }

// function updatePrice(){
//   for(var i = 0; i < symarray.length; i++){
//     requestQuote(symarray[i], updateCurrent);
//   }
// }

// -------------------------------------------------------------------------PUSH UP---------------->

function purchase(){
  var symbol = $("#symbol").val();
  var quantity = $("#quantity").val();
  quantity = parseInt(quantity, 10);

  requestQuote(symbol, function(data){
    var quote = data.Data;

    if(quote.LastPrice * quantity <= db.balance.amount){
      db.balance.amount -= quote.LastPrice * quantity;
      Δbalance.update(db.balance);
    }

    var stock = {};
    stock.name = quote.Name;
    stock.symbol = symbol;
    stock.purchasePrice = quote.LastPrice;
    stock.graphHeight = parseInt(quote.LastPrice, 10);
    stock.quantity = quantity;
    symarray.push(stock.symbol);
    Δstocks.push(stock);
  });

  $("#symbol").val("").focus();
  $("#quantity").val("");
}

function requestQuote(symbol, fn){
  var data = {symbol: symbol};
  $.getJSON("http://dev.markitondemand.com/Api/Quote/jsonp?callback=?", data, fn);
}

// -----------------------------------------------------------------------GET BACK-------------------->

function updateRows(snapshot){
  var stock = snapshot.val();
  imageStart(stock);
}

function imageStart(stock){
  var API_KEY = "b3b2f15713834c6af3bf843c46ade5c9";
  var PER_PAGE = 1;
  var page = 5;

  var query = stock.name;
  var url = "http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + API_KEY + "&text=" + query + "&per_page=" + PER_PAGE + "&page=" + page + "&format=json&jsoncallback=?";
  $.getJSON(url, results);

  $(this).css("height", stock.graphHeight + "px");
}

function results(data){
  for(var i = 0; i < data.photos.photo.length; i++){
    createImage(data.photos.photo[i]);
  }
}

function createImage(photo){
  var url = "url(http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_m.jpg)";
  var $graph = $("<div>");
  $graph.addClass("graph");
  $graph.css("background-image", url, "no-repeat");
  $("#innergraphbox").append($graph);
}

// ------------------------------------------------------------------------REMOVAL---------->

function reverseBuy(){
  var $this = $(this);
  $this.remove();
}