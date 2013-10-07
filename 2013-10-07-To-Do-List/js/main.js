"use strict";
$(document).ready(initialize);

function initialize(){
  $("#taskbutton").click(addTask);
  $("table").on("click", ".remove", remove);
  $("table").on("click", ".upbutton, .downbutton", up);
  $("table").on("click", ".checkbox", gray);
}

function addTask(){
  var $tr = $("<tr>");
  var $date = $("<td>");
  $date.addClass("date");
  var $task = $("<td>");
  $task.addClass("task");
  var $color = $("<td>");
  $color.addClass("color");
  var $done = $("<td>");
  $done.addClass("done");
  var $remove = $("<td>");
  $remove.addClass("remove");
  var $move = $("<td>");
  $move.addClass("move");

  var $datedata = $("#date").val();

  var $taskdata = $("#task").val();

  var $colordata = $("<div>");
  var colorentry = $("#color").val();
  $colordata.addClass("colorstyle");
  $colordata.css("background-color", colorentry);

  var $checkbox = $("<input>");
  $checkbox.attr("type", "checkbox");
  $checkbox.addClass("checkbox");

  var $removeButton = $("<input>");
  $removeButton.attr("type", "button");
  $removeButton.attr("value", "Remove");
  $removeButton.addClass("removebutton");


  var $upButton = $("<input>");
  $upButton.attr("type", "button");
  $upButton.addClass("upbutton");
  $upButton.css("height", "25px").css("width", "25px");

  var $downButton = $("<input>");
  $downButton.attr("type", "button");
  $downButton.addClass("downbutton");
  $downButton.css("height", "25px").css("width", "25px");


  $date.append($datedata);
  $task.append($taskdata);
  $color.append($colordata);
  $done.append($checkbox);
  $remove.append($removeButton);
  $move.append($upButton, $downButton);
  $tr.append($date, $task, $color, $done, $remove, $move);
  $("table").append($tr);

  $("#date").val("");
  $("#task").val("");
  $("#color").val("");
  $("#date").focus();
}

function remove(){
  var $bar = $(this);
  var $removal = $bar.parent();
  $removal.empty();
  $("#date").focus();
}

function up(){
  var $button = $(this);
  var $up = $button.parent().parent();

  if($button.hasClass("upbutton")){
    $up.prev().before($up);
  }
  else{
    $up.next().after($up);
  }
}

function gray(){
  var $this = $(this);
  var $gray = $this.parent().parent();
  if($this.is(":checked")){
    $gray.css("background-color", "gray");
  }
  else{
    $gray.css("background-color", "white");
  }
}