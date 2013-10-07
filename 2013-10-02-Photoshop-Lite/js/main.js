"use strict";
$(document).ready(initialize);

function initialize(){
  $("#colorbutton").click(addColor);
  $("#colorclearbutton").click(clearColor);
  $("#clear_box").click(clearBoxes);
  $("#add_box").click(addBoxes);
  // $(".box").click(boxClicked);
  // $("parent_selector").on("name of event", "child selector", name_of_function)
  $("#colorbox").on("click", ".box", boxClicked);
  $("#boxes").on("mouseover", ".paintbox", paintboxHover);
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

function clearBoxes(){
  $("#boxes").empty();
  $("#amount").focus();
}

function boxClicked(){
  var $box = $(this);
  var color = $box.css("background-color");

  $("#brush").css("background-color", color);
}

function addBoxes(){
  var $boxNumber = $("#amount").val();
  $boxNumber = parseFloat($boxNumber);

  for(var i = 0; i < $boxNumber; i++){
    var $box = $("<div>");
    $box.addClass("paintbox");
    $("#boxes").append($box);
  }
  $("#color").focus();
}

function paintboxHover(){
  var $canvas = $(this);
  var $brushColor = $("#brush").css("background-color");
  $canvas.css("background-color", $brushColor);
}