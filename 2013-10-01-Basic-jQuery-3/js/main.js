$(document).ready(initialize)

function add(num1,num2){
  return num1 + num2;
}

function compute_sum(){
  var num1 = $("#num1").val();
  var num2 = $("#num2").val();
  num1 = parseInt(num1);
  num2 = parseInt(num2);
  var answer = add(num1,num2);
  answer = parseInt(answer);
  // $("#result").text(answer);
  alert("Your answer is: " + answer + ".");
}

function initialize(){
  $("#add").click(compute_sum);




}