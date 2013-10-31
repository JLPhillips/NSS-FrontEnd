"use strict";

// ------------------------------------------------------[Database Setup]----------------->

// Firebase Schema
var Δdb;
var Δproducts;
var Δcustomers;
var Δorders;

// Local Schema (defined in keys.js)
db.products = db.customers = db.orders = [];

// ------------------------------------------------------[Start]----------------->

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  initializeDatabase();
  turnHandlersOn();
}

// ------------------------------------------------------[Click Handlers]----------------->

function initializeDatabase(){
  Δdb = new Firebase(db.keys.firebase);
  Δproducts = Δdb.child("products");
  Δcustomers = Δdb.child("customers");
  Δorders = Δdb.child("orders");

  Δproducts.on("child_added", dbProductAdded);
  Δcustomers.on("child_added", dbCustomerAdded);
  Δorders.on("child_added", dbOrderAdded);
}

function turnHandlersOn(){
  $("#add-product").on("click", clickAddProduct);
}

function turnHandlersOff(){
  $("#add-product").off("click", clickAddProduct);
}

// ------------------------------------------------------[Click Functions]----------------->

function clickAddProduct(){
  var image = getValue("#product-image");
  var name = getValue("#product-image");
  var weight = getValue("#product-image", par);
  var price = getValue("#product-image");
  var off = getValue("#product-image");
}

// ------------------------------------------------------[Definitions]----------------->

function Product(image, name, weight, price, off){
  this.image = image;
  this.name = name;
  this.weight = weight;
  this.price = price;
  this.off = off;
  this.salePrice = function(){return this.price - (this.price * this.off);};
}

function Customer(id, image, name, location){

}

function Order(id, timestamp, customer, products, total, shippingCost, grandTotal){

}

// ------------------------------------------------------[Added Functions]----------------->

function dbProductAdded(snapshot){
  var obj = snapshot.val();
}

function dbCustomerAdded(snapshot){
  var
}

function dbOrderAdded(snapshot){

}

// ------------------------------------------------------[Get Value]----------------->

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

// ------------------------------------------------------[End]----------------->
