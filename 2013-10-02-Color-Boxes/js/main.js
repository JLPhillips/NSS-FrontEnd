$(document).ready(initialize)

function initialize(){
  $("#button1").click(makeColorBoxes);
  $("#button2").click(clearInput);
  $("#button3").click(clearBoxes);
  $("#colors").focus();
}

function makeColorBoxes(){
  var colorstring = $("#colors").val();
  var colors = colorstring.split(", ");

  for(var i = 0; i < colors.length; i++){
    var $color = $("<div>");
    $color.addClass("box");
    // $color.text(colors[i]);
    $color.css("background-color", colors[i]);

    $("#boxes").append($color);
  }
}

function clearInput(){
  $("#colors").val("");
  $("#colors").focus();
}

function clearBoxes(){
  $("#boxes").empty();
  clearInput();
}