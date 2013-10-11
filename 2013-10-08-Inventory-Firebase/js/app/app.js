"use strict";

// Database Schema
var Δdb;
var Δitems;
var Δperson;

// Local Schema
var db = {};
db.items = [];
db.person = {};
db.statistics = {};
db.statistics.grandtotal = 0;

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $("#add").click(add);
  $("#save").click(save);

  Δdb = new Firebase("https://inventory-jlp.firebaseio.com/");
  Δitems = Δdb.child("items");
  Δperson = Δdb.child("person");
  Δperson.on("value", personChanged);
  // Δdb.once("value", recieveDb);
  Δitems.on("child_added", itemAdded);
}

function itemAdded(snapshot){
  var item = snapshot.val();
  createRow(item);
  sum(item);
  db.items.push(item);
}

function personChanged(snapshot){
  var person = snapshot.val();

  try{
    $("#person").val(person.fullName);
    $("#address").val(person.address);
    db.person = person;
  } catch (error) {
    console.log(error);
  }

  console.log(person);

  // items = [];

  // for(var property in inventory.items){
  //   var item = inventory.items[property];
  //   items.push(item);
  // }

  // OLD WAY OF DOING IT
  // if(inventory.items){
  //   // console.log("Yes, there are items.");
  //   items = inventory.items;
  // }else {
  //   // console.log("No, there aren't any items.");
  //   items = [];
  // }

  // var $header = $("#items tr:first-child").detach();
  // $("#items").empty().append($header);
  // for(var i = 0; i < items.length; i++){
  //   createRow(items[i]);
  // }
}

function save(){
  var fullName = $("#person").val();
  var address = $("#address").val();
  var person = {};
  person.fullName = fullName;
  person.address = address;

  Δperson.update(person);
}

function add(){
  var name = $("#name").val();
  var count = parseInt($("#amount").val(),10);
  var cost = parseInt($("#value").val(),10);
  var room = $("#room").val();
  var condition = $("#condition").val();
  var date = $("#date").val();

  var item = {};
  item.name = name;
  item.count = count;
  item.cost = cost;
  item.room = room;
  item.condition = condition;
  item.date = date;

  Δitems.push(item);
}

function createRow(item){
  var row = "<tr><td class='name'></td><td class='count'></td><td class='cost'></td><td class='room'></td><td class='condition'></td><td class='date'></td></tr>";
  var $row = $(row);

  $row.children(".name").text(item.name);
  $row.children(".count").text(item.count);
  $row.children(".cost").text("$" + item.cost);
  $row.children(".room").text(item.room);
  $row.children(".condition").text(item.condition);
  $row.children(".date").text(item.date);

  $("#items").append($row);
}

function sum(item){
  db.statistics.grandtotal += (item.count * item.cost);
  $("#sum").val("$" + db.statistics.grandtotal + ".00");


  // var multiplication = 0;

  // for(var i = 0; i < items[i].cost.length; i++){
  //   var number = 0;
  //   var timesnumber = 0;
  //   number += parseFloat(items[i].count[i].val());
  //   timesnumber += parseFloat(items[i].cost[i].val());
  //   multiplication += (number * timesnumber);
  //   finalsum += multiplication;
  // }

  // $("#sum").val("$" + finalsum);
}