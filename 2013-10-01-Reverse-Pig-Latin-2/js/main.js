$(document).ready(initialize)

function piglatin(word){
  return word.slice(1) + word[0] + "ay";
}

function pig_reverse(sentence){
  var words = sentence.split(", ");
  var pig_words = [];
  for (var i = 0; i < words.length; i++){
    pig_words.push(piglatin(words[i]));
  }
  return pig_words.reverse().join("; ");
}

function piglatinize(){
  var word = $("#word").val();
  var answer = pig_reverse(word);
  $("#result").val(answer);
}

function initialize(){
$("#button").click(piglatinize);


}