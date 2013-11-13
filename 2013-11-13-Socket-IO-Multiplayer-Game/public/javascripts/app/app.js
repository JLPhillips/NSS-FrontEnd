/* global document, window, io */

$(document).ready(initialize);

var socket;
var player;
var color;
var name;

function initialize(){
  $(document).foundation();
  initializeSocketIO();
  $('#start').on('click', clickStart);
}

function clickStart(){
  player = getValue('#player');
  color = getValue('#color');
  // name = getValue('#name');
  socket.emit('startgame', {player:player, color:color, name:name});
  $("#battleground").removeClass("hidden");
  $("#fieldrow").addClass("hidden");
  $("#titlerow").addClass("hidden");
}

function initializeSocketIO(){
  var port = window.location.port ? window.location.port : '80';
  var url = window.location.protocol + '//' + window.location.hostname + ':' + port + '/app';

  socket = io.connect(url);
  socket.on('connected', socketConnected);
}

function socketConnected(data){
  console.log(data);
}
