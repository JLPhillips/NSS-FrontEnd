"use strict";
$(document).ready(initialize);

function initialize(){
  $("#add").click(addRow);
  $("table").on("click", ".rsvp", rsvp);
  $("table").on("click", ".nuke", nuke);
  $("table").on("click", ".downbutton, .upbutton", move);

}

function addRow(){
  var $tr = $("<tr>");
  var $name = $("<td>");
  $name.addClass("name");
  var $food = $("<td>");
  $food.addClass("food");
  var $ctrl = $("<td>");
  $ctrl.addClass("ctrl");
  var $nuke = $("<td>");
  $nuke.addClass("nuke");
  var $move = $("<td>");
  $move.addClass("move");

  var $input = $("<input>");
  $input.attr("type", "text");

  var $button = $("<input>");
  $button.attr("type", "button");
  $button.val("RSVP!");
  $button.addClass("rsvp");

  var $nukeBtn = $("<input>");
  $nukeBtn.attr("type", "button");
  $nukeBtn.val("NUKE!");
  $nukeBtn.addClass("nuke");

  var $upButton = $("<input>");
  $upButton.attr("type", "button");
  $upButton.addClass("move");
  $upButton.addClass("upbutton");

  var $downButton = $("<input>");
  $downButton.attr("type", "button");
  $downButton.addClass("move");
  $downButton.addClass("downbutton");

  $ctrl.append($input, $button);
  $nuke.append($nukeBtn);
  $move.append($upButton, $downButton);
  $tr.append($name, $food, $ctrl, $nuke, $move);
  $("table").append($tr);
  $input.focus();
}

function rsvp(){
  var $button = $(this);
  var $textbox = $button.prev();
  var text = $textbox.val();
  var items = text.split(", ");
  var name = items[0];
  var food = items[1];
  var $nameTD = $button.parent().prev().prev();
  var $foodTD = $button.parent().siblings(".food");
  $nameTD.text(name);
  $foodTD.text(food);
}

function nuke(){
  var $nuke = $(this);
  var $stufftonuke = $nuke.parent().parent();
  $stufftonuke.empty();
}

// function goUp(){
//   var $button = $(this);
//   var $elevator = $button.parent().parent();
//   var $shaft = $button.parent().parent().prev();
//   $shaft.before($elevator);

// }

// function goDown(){
//   var $button = $(this);
//   var $elevator = $button.parent().parent();
//   var $shaft = $button.parent().parent().next();
//   $shaft.after($elevator);
// }

function move(){
  var $button = $(this);
  var $tr = $button.parent().parent();

  if($button.hasClass("upbutton")){
    $tr.prev().before($tr);
  }
  else{
    $tr.next().after($tr);
  }
}