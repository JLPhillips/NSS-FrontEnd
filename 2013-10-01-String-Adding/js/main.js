$(document).ready(initialize)

function create_array(input){
  var array_digit = input + 1;
  return _.range(array_digit).slice(1);
}

function mass_multiply(){
  // debugger;
  var stock = parseInt($("#field2").val());
  var broth = parseInt($("#field1").val());
  var array = create_array(stock);
  var numbers = [];
  var sum = 0;
  for(var i = 0; i < array.length; i++){
    var number = parseInt(array[i] * broth);
    sum += number;
    numbers.push(number);
  }
  return $("#result").text("Your answer is: [" + numbers + "] = " + sum + ".");
}

function initialize(){
  $("#button").click(mass_multiply);
}

