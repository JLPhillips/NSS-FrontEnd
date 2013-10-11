'use strict';

$(document).ready(initialize);

function initialize(){
  $(document).foundation();

  try {
    console.log(x);
  } catch(e){
    console.log("You just received the error: " + e);
  }
}
