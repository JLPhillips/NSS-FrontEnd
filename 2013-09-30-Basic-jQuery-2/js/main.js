$(document).ready(initialize);

function make_green(){
  $("#green").text("I'm green!").css({"background-color": "green", "color": "white"});
}

function count_characters(){
  var characters = $("#name_txt").val().length;
  $("#name_div").text(characters);
}

function initialize(){
  $("#button1").click(make_green);
  $("#name_btn").click(count_characters);
}