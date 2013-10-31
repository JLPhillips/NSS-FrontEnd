var mm = require("money-math");

var Movie = function(genericMovie){
  this.TITLE = genericMovie.TITLE;
  this.IMAGE = genericMovie.IMAGE;
  this.COLOR = genericMovie.COLOR;
  this.RATED = genericMovie.RATED;
  this.STUDIO = genericMovie.STUDIO;
  this.GROSS = genericMovie.GROSS;
  this.numTheaters = genericMovie.numTheaters;

  this.grossPerTheater = function(){
    return this.GROSS / this.numTheaters;
  };

  this.grossUSD = function(){
    return "$" + mm.format("USD", mm.floatToAmount(this.GROSS));
  };

  this.grossPerTheaterUSD = function(){
    return "$" + mm.format("USD", mm.floatToAmount(this.grossPerTheater()));
  };
};

module.exports = Movie;