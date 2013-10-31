'use strict';
$('#previous').hide();
$('#next').hide();
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

// Firebase Schema
var Δdb;
var Δproducts;
var Δcustomers;
var Δorders;

// Local Schema (defined in keys.js)
db.products = db.customers = db.orders = [];
db.cart = [];
db.cart.products = [];
db.cart.customer = [];
db.cart.totals = [];
db.pagination = {};
db.pagination.perPage = 5;
db.pagination.currentPage = 1;
db.pagination.currentRowCount = 0;

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  initializeDatabase();
  turnHandlersOn();
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

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
  $('#purchase').on('click', clickPurchase);
  $('#previous').on('click', clickNavigation);
  $('#next').on('click', clickNavigation);

  $('#products').on('click', '.product', clickProduct);
  $('#select-customer').on('change', changeCustomer);
}

function turnHandlersOff(){
  $('#add-customer').off('click');
  $('#add-product').off('click');
  $('#purchase').off('click');
  $('#previous').off('click');
  $('#next').off('click');
  $('#select-customer').off('change');
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
  var domesticstatus = $('#domestic')[0].checked;
  var internationalstatus = $('#international')[0].checked;

  var customer = new Customer(image, name, domesticstatus, internationalstatus);
  Δcustomers.push(customer);
  // htmlResetRadioButtons();
  htmlClearRadioButtons('#domestic');
  htmlClearRadioButtons('#international');
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

function clickProduct(){
  var $this = $(this);
  $('tr').removeClass('highlight');
  if($this.hasClass('highlight')){
    $this.removeClass('highlight');
  }else{
    $this.addClass('highlight');
  }
}

function clickPurchase(){
  var customer = $('#select-customer').val();
  var name = $('.highlight .product-name').text();
  console.log(name);
  var product = _.find(db.products, function(p){return p.name === name;});
  db.cart.products.push(product);
  db.cart.customer.push(customer);
  var $selected = $('tr.highlight');
  $selected.removeClass('highlight');
  alert(name + " added to cart.")
  htmlUpdateCart(product);
}

function changeCustomer(){
  var name = this.value;
  var customer = _.find(db.customers, function(c){return c.name === name;});
  db.cart.customer = customer;
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
  var cust = snapshot.val();
  var customer = new Customer(cust.image, cust.name, cust.isDomestic, cust.isInternational);
  customer.id = snapshot.name();
  db.customers.push(customer);
  htmlAddCustomer(customer);
}

function dbOrderAdded(snapshot){
  var order = snapshot.val();
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function htmlAddProduct(product){
  db.pagination.currentRowCount++;
  var tr = '<tr class="product"><td class="product-image"><img src="/img/' + product.image + '"></td><td class="product-name">' + product.name + '</td><td class="product-weight">' + product.weight + ' lbs</td><td class="product-price">' + formatCurrency(product.price) + '</td><td class="product-off">' + product.off + '</td><td class="product-sale">' + formatCurrency(product.salePrice()) + '</td></tr>';
  var $tr = $(tr);
  $('#products').append($tr);
}

function htmlAddCustomer(customer){
  // var tr = '<tr class="customer"><td class="customer-image"><img src="/img/' + customer.image + '"></td><td class="customer-name">' + customer.name + '</td></tr>';
  // var $tr = $(tr);
  // $('#customers').append($tr);
  var $option = $('<option value="' + customer.name + '">' + customer.name + '</option>');
  $('#select-customer').prepend($option);
}

function htmlShowHideNavigation(selector, shouldShow){
  $(selector).removeClass('hidden');
  $(selector).show();

  if(!shouldShow){
    $(selector).addClass('hidden');
    $(selector).hide();
  }
}

function htmlEmptyProductRows(){
  $('.product').remove();
}

// function htmlResetRadioButtons(){
//   $('input[name="address"]').each(function(index, dom){
//     dom.checked = false;
//   });
// }

function htmlClearRadioButtons(selector){
  if($(selector)[0].checked === true){
    $(selector)[0].checked = false;
  }
}

function htmlUpdateCart(product){
  updateCart(product);
  product.total = parseFloat(product.count * product.price);
  product.amount = product.price;
  var tr = '<tr class="product"></td><td class="product-name">' + product.name + '</td><td class="product-count">' + product.count + '</td><td class="product-amount">' + product.amount + '</td><td class="product-weight">' + product.weight + ' lbs</td><td class="product-off">' + product.off + '</td><td class="total">' + formatCurrency(product.total) + '</td></tr>';
  var $tr = $(tr);
  $('#cart').append($tr);
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

function Customer(image, name, domesticstatus, internationalstatus){
  this.image = image;
  this.name = name;
  this.isDomestic = domesticstatus;
  this.isInternational = internationalstatus;
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

function updateCart(product){
  var count = product.count;
  count = 1;
  db.cart.totals.push(count);

}