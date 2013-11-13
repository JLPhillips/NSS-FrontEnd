var mongoose = require('mongoose');
var Game = mongoose.model('Game');
var Player = mongoose.model('Player');

exports.connection = function(socket){
  socket.emit('connected', {status: 'connected'});
  socket.on('disconnect', socketDisconnect);
  socket.on('startgame', socketStartGame);
};

function socketDisconnect(){
}

function socketStartGame(data){
  var socket = this;
  Game.findOne({name: data.name}).populate('players').exec(function(err, game){
    if(game){
        console.log('Found a game!');
        addPlayer(game, data, socket);
    }else{
      new Game({name: data.name}).save(function(err, game){
        console.log('Created new game!');
        addPlayer(game, data, socket);
      });
    }
  });
}

function addPlayer(game, data, socket){
  Player.findOne({name: data.player}, function(err, player){
    if(player){
      var isFound = __.any(game.players, function(id){return id.toString() === player.id;});
      if(isFound){
        player.health = 100;
        player.save(function(err, player){
          console.log('player found and health restored');
          notifyPlayersOfJoin(game.players, socket);
        });
      } else {
        new Player({name: data.player, color: data.color, socketId: socket.id}).save(function(err, player){
          game.players.push(player);
          game.save(function(err, game){
            console.log('new player added to game');
            notifyPlayersOfJoin(game.players, socket);
          });
        });
      }
    } else {
      new Player({name: data.player, color: data.color}).save(function(err, player){
        game.players.push(player);
        game.save(function(err, game){
          console.log('new player added to game');
          notifyPlayersOfJoin(game.players, socket);
        });
      });
    }
  });
}

function notifyPlayersOfJoin(players, socket){
  console.log("This is the number of currently active sockets.");
  console.log(socket.namespace.sockets.length);
}