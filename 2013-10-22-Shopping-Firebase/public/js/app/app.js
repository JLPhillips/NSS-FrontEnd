'use strict';
$('#previous').hide();
$('#next').hide();
$('#purchasebutton').hide();
$('#orderscontainer').hide();
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

// Firebase Schema
var Δdb;
var Δproducts;
var Δcustomers;
var Δorders;

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  initializeSchema();
  initializeDatabase();
  turnHandlersOn();
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function initializeSchema(){
  db.constants = {};
  db.constants.domesticShipping = 0.50;
  db.constants.internationalShipping = 1.50;

  db.products = [];
  db.customers = [];
  db.orders = [];

  db.pagination = {};
  db.pagination.perPage = 5;
  db.pagination.currentPage = 1;
  db.pagination.currentRowCount = 0;

  db.cart = new Cart();
}

function initializeDatabase(){
  Δdb = new Firebase(db.keys.firebase);
  Δproducts = Δdb.child('products');
  Δcustomers = Δdb.child('customers');
  Δorders = Δdb.child('orders');

  Δproducts.on('child_added', dbProductAdded);
  Δcustomers.on('child_added', dbCustomerAdded);
  Δorders.on('child_added', dbOrderAdded);
}

function turnHandlersOn(){
  $('#add-product').on('click', clickAddProduct);
  $('#add-customer').on('click', clickAddCustomer);
  $('#previous').on('click', clickNavigation);
  $('#next').on('click', clickNavigation);
  $('#products').on('click', 'img', clickAddItemToCart);
  $('#select-customer').on('change', changeCustomer);
  $('#plate').click(clickPlate);
  $('#purchasebutton').on('click', clickPurchaseButton);
}

function turnHandlersOff(){
  $('#add-product').off('click');
  $('#add-customer').off('click');
  $('#previous').off('click');
  $('#next').off('click');
  $('#products').off('click');
  $('#select-customer').off('change');
  $('#purchasebutton').off('click');
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function clickAddProduct(){
  var image = getValue('#product-image');
  var name = getValue('#product-name');
  var weight = getValue('#product-weight', parseFloat);
  var price = getValue('#product-price', parseFloat);
  var off = getValue('#product-off', parseFloat) / 100;

  var product = new Product(image, name, weight, price, off);
  delete product.salePrice;
  Δproducts.push(product);
}

function clickAddCustomer(){
  var image = getValue('#customer-image');
  var name = getValue('#customer-name');
  var isDomestic = $('input[name="address"]:checked').val() === 'domestic';
  htmlResetRadioButtons();

  var customer = new Customer(image, name, isDomestic);
  Δcustomers.push(customer);
}

function clickNavigation(){
  db.pagination.currentRowCount = 0;
  htmlEmptyProductRows();

  var isPrevious = this.id === 'previous';
  db.pagination.currentPage += isPrevious ? -1 : +1;

  var startIndex = db.pagination.perPage * (db.pagination.currentPage - 1);
  var endLength = (startIndex + db.pagination.perPage) > db.products.length ? db.products.length : startIndex + db.pagination.perPage;
  var isLess = startIndex > 0;
  var isMore = db.products.length > endLength;

  htmlShowHideNavigation('#previous', isLess);
  htmlShowHideNavigation('#next', isMore);

  for(var i = startIndex; i < endLength; i++){
    htmlAddProduct(db.products[i]);
  }
}

function clickAddItemToCart(){
  if(db.cart.customer){
    var name = $(this).parent().next().text();
    var product = _.find(db.products, function(p){return p.name === name;});
    db.cart.products.push(product);
    htmlAddItemToCart(product);
    htmlUpdateCartTotals();
    $('#purchasebutton').fadeIn();
  }
}

function changeCustomer(){
  var name = this.value;
  var customer = _.find(db.customers, function(c){return c.name === name;});
  db.cart.customer = customer;
}

function clickPlate(){
  $('#plate').fadeOut();
}

function clickPurchaseButton(){
  var id = Math.random(99999);
  var time = 10;
  var customer = db.cart.customer;
  var products = db.cart.products;
  var total = 4000;
  var shipping = 10;
  var grand = 4010;

  var order = new Order(id, time, customer, products, total, shipping, grand);
  $('tr.product-in-cart').remove();
  htmlAddOrder(order);
  htmlResetDropdown();
  htmlEmptyCartTotals();
  htmlClearPage();
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function dbProductAdded(snapshot){
  var obj = snapshot.val();
  var product = new Product(obj.image, obj.name, obj.weight, obj.price, obj.off);
  product.id = snapshot.name();
  db.products.push(product);
  if(db.pagination.currentRowCount < db.pagination.perPage){
    htmlAddProduct(product);
  } else {
    htmlShowHideNavigation('#next', true);
  }
}

function dbCustomerAdded(snapshot){
  var obj = snapshot.val();
  var customer = new Customer(obj.image, obj.name, obj.isDomestic);
  customer.id = snapshot.name();
  db.customers.push(customer);
  htmlAddCustomerToSelect(customer);
}

function dbOrderAdded(snapshot){
  var obj = snapshot.val();
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function htmlAddProduct(product){
  db.pagination.currentRowCount++;
  var tr = '<tr class="product"><td class="product-image"><img src="/img/' + product.image + '"></td><td class="product-name">' + product.name + '</td><td class="product-weight">' + product.weight.toFixed(2) + ' lbs</td><td class="product-price">' + formatCurrency(product.price) + '</td><td class="product-off">' + product.off.toFixed(2) + '</td><td class="product-sale">' + formatCurrency(product.salePrice()) + '</td></tr>';
  var $tr = $(tr);
  $('#products').append($tr);
}

function htmlShowHideNavigation(selector, shouldShow){
  $(selector).removeClass('hidden');
  $(selector).fadeIn();

  if(!shouldShow){
    $(selector).addClass('hidden');
    $(selector).fadeOut();
  }
}

function htmlEmptyProductRows(){
  $('.product').remove();
}

function htmlResetRadioButtons(){
  $('input[name="address"]:checked')[0].checked = false;
}

function htmlAddCustomerToSelect(customer){
  var $option = $('<option>');
  $option.val(customer.name);
  $option.text(customer.name);
  $('#select-customer').prepend($option);
}

function htmlAddItemToCart(product){
  var count, $tr, tr;
  var $tds = $('#cart tbody .product-name');
  var foundTd = _.find($tds, function(td){return td.innerText === product.name;});

  if(foundTd){
    count = parseInt($(foundTd).next().text(), 10);
    count++;
    $tr = $(foundTd).parent();
  } else {
    count = 1;
    tr = '<tr class="product-in-cart"><td class="product-name"></td><td class="product-count"></td><td class="product-amount"></td><td class="product-weight"></td><td class="product-shipping"></td><td class="product-grand"></td></tr>';
    $tr = $(tr);
    $('#cart tbody').append($tr);
  }

  var amount = product.salePrice() * count;
  var weight = product.weight * count;
  var shipping = weight * (db.cart.customer.isDomestic ? db.constants.domesticShipping : db.constants.internationalShipping);
  var grand = amount + shipping;

  $tr.children('.product-name').text(product.name);
  $tr.children('.product-count').text(count);
  $tr.children('.product-amount').text(formatCurrency(amount));
  $tr.children('.product-weight').text(weight.toFixed(2) + ' lbs');
  $tr.children('.product-shipping').text(formatCurrency(shipping));
  $tr.children('.product-grand').text(formatCurrency(grand));
}

function htmlUpdateCartTotals(){
  $('#cart-count').text(db.cart.totals.count());
  $('#cart-amount').text(formatCurrency(db.cart.totals.amount()));
  $('#cart-weight').text(db.cart.totals.weight().toFixed(2) + ' lbs');
  $('#cart-shipping').text(formatCurrency(db.cart.totals.shipping()));
  $('#cart-grand').text(formatCurrency(db.cart.totals.grand()));
}

function htmlEmptyCartTotals(){
  $('#cart-count').text('');
  $('#cart-amount').text('');
  $('#cart-weight').text('');
  $('#cart-shipping').text('');
  $('#cart-grand').text('');
}

function htmlResetDropdown(){
  $('#select-customer').val('Select Customer');
}

function htmlClearPage(){
  $('#top').fadeOut();
}

// id, time, customer, products, total, shipping, grand
function htmlAddOrder(order){
  $('#orderscontainer').fadeIn();
  var id = order.id;
  var time = order.time;
  var customer = order.customer;
  var products = order.products;
  var total = order.total;
  var shipping = order.shipping;
  var grand = order.grand;
  db.orders.id= id;

  var tr = '<tr><td class="order-id">' + id + '</td><td class="order-time">' + time + '</td><td class="order-customer">' + customer + '</td><td class="order-products">' + products + '</td><td class="order-total">' + total + '</td><td class="order-shipping">' + shipping + '</td><td class="product-grand">' + grand + '</td></tr>';
  var $tr = $(tr);
  $('#orders tbody').append($tr);
  db.orders.push(order);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function Product(image, name, weight, price, off){
  this.image = image;
  this.name = name;
  this.weight = weight;
  this.price = price;
  this.off = off;
  this.salePrice = function(){return this.price - (this.price * this.off);};
}

function Customer(image, name, isDomestic){
  this.image = image;
  this.name = name;
  this.isDomestic = isDomestic;
}

function Cart(){
  var save = this;
  this.customer = null;
  this.products = [];
  this.totals = {};
  this.totals.count = function(){return save.products.length;};
  this.totals.amount = function(){return _.reduce(save.products, function(memo, product){return memo + product.salePrice();}, 0);};
  this.totals.weight = function(){return _.reduce(save.products, function(memo, product){return memo + product.weight;}, 0);};
  this.totals.shipping = function(){return this.weight() * (save.customer.isDomestic ? db.constants.domesticShipping : db.constants.internationalShipping);};
  this.totals.grand = function(){return this.amount() + this.shipping();};
}

function Order(){
  var save = this;
  this.products = [];
  this.totals = {};


}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function getValue(selector, fn){
  var value = $(selector).val();
  value = value.trim();
  $(selector).val('');

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
  return '$' + number.toFixed(2);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //