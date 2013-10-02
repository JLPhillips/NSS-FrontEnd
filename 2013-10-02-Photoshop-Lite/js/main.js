$(document).ready(initialize)

function initialize(){
  $("#colorbutton").click(addColor);
  $("#colorclearbutton").click(clearColor);
}

function addColor(){
  var $colorentry = $("#color").val();
  var $color = $("<div>");
  $color.addClass("box");
  $color.css("background-color", $colorentry);
  $("#colorbox").append($color);
  $("#color").val("");
  $("#color").focus();
}

function clearColor(){
  $("#colorbox").empty();
  $("#color").focus();
}