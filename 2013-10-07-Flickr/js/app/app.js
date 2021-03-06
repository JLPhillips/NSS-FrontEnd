"use strict";

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $("#search").click(searchFlickr);
  $("#photos").on("dblclick", ".photo", dblClickRemove);
  $("#photos").on("click", ".photo", addBorder);
  $("#clearbutton").click(clear);
  $("#deletebutton").click(deletePhotos);
  $("#savebutton").click(savePhotos);
}

function searchFlickr(){
  var API_KEY = "b3b2f15713834c6af3bf843c46ade5c9";
  var PER_PAGE = 12;
  var page = 1;

  var query = $("#query").val();
  var url = "http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + API_KEY + "&text=" + query + "&per_page=" + PER_PAGE + "&page=" + page + "&format=json&jsoncallback=?";
  $.getJSON(url, results);
}

function results(data){
  for(var i = 0; i < data.photos.photo.length; i++){
  createImage(data.photos.photo[i]);
  }
}

function createImage(photo){
  var url = "url(http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_m.jpg)";
  var $div = $("<div>");
  $div.addClass("photo");
  $div.css("background-image", url);
  $("#photos").prepend($div);
}

function dblClickRemove(){
  $(this).remove();
}

function clear(){
  var $clear = $("#photos");
  $clear.empty();
  $("#query").focus();
  alert("Deleted!");
}

function deletePhotos(){
  $(".photoborder").remove();
}

function savePhotos(){
  var $selected = $(".photoborder");
  $selected.removeClass("photoborder");
  $("#saved_photos").prepend($selected);
}

function addBorder(){
  var $this = $(this);
  if ($this.hasClass("photoborder")){
    $this.removeClass("photoborder");
  }
  else{
    $this.addClass("photoborder");
  }
}

// HOW CHYLD DID THIS^^^^^^

// function addBorder(){
//   $(this).toggleClass("selected");
// }