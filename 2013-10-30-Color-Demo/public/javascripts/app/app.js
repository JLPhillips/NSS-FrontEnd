$(document).ready(initialize);

function initialize(){
  $(document).foundation();

  $(".color").on("click", clickColor);
}

function clickColor(){
  var $this = $(this);
  $this.css("background-color", "#fdfdfd");
}