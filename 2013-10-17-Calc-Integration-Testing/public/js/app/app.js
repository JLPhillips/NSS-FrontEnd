"use strict";

// Firebase Schema
// var Δdb;

// Local Schema (defined in keys.js)

$(document).ready(initialize);

function initialize(fn, flag){
  if(!canRun(flag)) {return;}

  $(document).foundation();
  $("#result").on("dblclick", "span.result", clickDelete);
  $("#calculate").click(calculate);
  $("#reset").click(reset);
  $("#negative").click(clickFilterPositive);
  $("#positive").click(clickFilterNegative);
  $("#sum").click(clickSum);
  $("#product").click(clickProduct);
}

// ------------------------------------------------------[calculate]----------------->

// function calculate(){
//   var op1 = parseFloat($("#op1").val());
//   var op2 = parseFloat($("#op2").val());
//   var $operator = $("#operator").val();
//   var result = 0;
//   if($operator === "*"){
//     result = op1 * op2;
//   }else if($operator === "x"){
//     result = op1 * op2;
//   }else if($operator === "+"){
//     result = op1 + op2;
//   }else if($operator === "-"){
//     result = op1 - op2;
//   }else if($operator === "/"){
//     result = op1 / op2;
//   }else if($operator === "%"){
//     result = op1 / op2;
//   }
//   $("#op1").val("").focus();
//   $("#op2").val("");
//   $("#operator").val("");
//   $("#result").text(result);
//   // htmlAddToPaperTrail(op1, operator, op2, result);
// }

// ------------------------------------------------------[CHYLD]----------------->

function calculate(){
  var op1 = getValue("#op1");
  var op2 = getValue("#op2");
  var operator = getValue("#operator");
  var computation = op1 + operator + op2;
  var result = eval(computation);
  htmlUpdateResult(result);
  htmlAddToPaperTrail(op1, operator, op2, result);
}

function htmlUpdateResult(result){
  $("#result").text(result);
}

// ------------------------------------------------------[Reset]----------------->

function reset(){
  $("#result").text("RESULT");
  $("#op1").focus();
  $("#history").empty();
}

// ------------------------------------------------------[Delete]----------------->

function clickDelete(){
  var $li = $(this).parent();
  $li.remove();
}

// ------------------------------------------------------[Sum]----------------->

function clickSum(){
  var $results = $("span.result");
  var numbers = _.map($results, function(span){return parseFloat($(span).text());});
  var sum = _.reduce(numbers, function(memo, num){return memo + num;}, 0);
  htmlUpdateResult(sum);
}

// ------------------------------------------------------[Product]----------------->

function clickProduct(){
  var $results = $("span.result");
  var numbers = _.map($results, function(span){return parseFloat($(span).text());});
  var product = _.reduce(numbers, function(memo, num){return memo * num;}, 1);
  htmlUpdateResult(product);
}

// ------------------------------------------------------[htmlAddToPaperTrail]----------------->

function htmlAddToPaperTrail(op1, operator, op2, result){
  var $li = $("<li>");
  var spans = "<h1><span class='op1'>" + op1 + "</span><span class='operator'>" + operator + "</span><span class='op2'>" + op2 + "</span><span class='equal'>=</span><span class='result'>" + result + "</span></h1>";
  var $spans = $(spans);
  $li.append($spans);
  $("#history").prepend($li);
}
// ------------------------------------------------------[Filter Functions]----------------->

function clickFilterNegative(){
  $("span.result:contains('-')").parent().remove();
}

function clickFilterPositive(){
  $("span.result").not(":contains('-')").parent().remove();
}

// ------------------------------------------------------[getValue]----------------->

function getValue(selector, fn){
  var value = $(selector).val();
  value = value.trim();
  $(selector).val("");

  if(fn){
    value = fn(value);
  }

  return value;
}

function parseUpperCase(string){
  return string.toUpperCase();
}

function parseLowerCase(string){
  return string.toLowerCase();
}

function formatCurrency(number){
  return "$" + number.toFixed(2);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function canRun(flag){
  var isQunit = $("#qunit").length > 0;
  var isFlag = flag !== undefined;
  var value = isQunit && isFlag || !isQunit;
  return value;
}

// ------------------------------------------------------[END]----------------->