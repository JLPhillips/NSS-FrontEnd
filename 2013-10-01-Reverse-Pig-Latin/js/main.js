$(document).ready(initialize)

function piglatin(word){
  return word.slice(1) + word[0] + "ay";
}

function piglatinize(){
  var word = $("#word").val();
  var answer = piglatin(word);
  $("#result").val(answer);
}

function initialize(){
$("#button").click(piglatinize);




}