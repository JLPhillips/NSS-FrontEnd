"use strict";

var timer;
var dimension = parseFloat($("#dimensions").val());

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $("#start").click(start);
  $("#stop").click(stop);
  $("#clear").click(clear);
}

function start(){
  timer = setInterval(randomize, (parseFloat($("#delay").val()) * 1000));
}

function stop(){
  clearInterval(timer);
}

function randomize(){
  var dimensions = $("#dimensions").val();
  dimensions = dimensions.split(", ");
  var width = dimensions[0];
  var height = dimensions[1];

  var $box = $("<div>");
  $box.addClass("box");
  $box.css("width", width);
  $box.css("height", height);
  $box.css("background-color", "rgba(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.random() + ")");
  $("#colors").append($box);
}

function clear(){
  $("#colors").empty();
}