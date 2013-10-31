var db = require("../modules/database");
var file = __dirname + "/../db/movies.json";
var Movie = require("../models/movie");
var _ = require("lodash");

// -----------------------------------------------[MOVIES]----------------->

exports.index = function(req, res){
  var genericMovies = db.read(file);
  var movies = _.map(genericMovies, function(genericMovie){
    return new Movie(genericMovie);
  });


  res.render('movies/index', {title: 'Movies | Movies', movies: movies});
};

// -----------------------------------------------[DELETE]----------------->

exports.delete = function(req, res){
  var title = req.params.title;
  var movies = db.read(file);
  movies = _.reject(movies, function(movie){return movie.TITLE === title;});
  db.write(file, movies);
  res.redirect("/movies");
};

// -----------------------------------------------[MOVIES]----------------->

exports.new = function(req, res){
  res.render('movies/new', {title: 'Movies | New Movie'});
};

// -----------------------------------------------[CREATE]----------------->

exports.create = function(req, res){
  var title = req.body.TITLE;
  var image = req.body.IMAGE;
  var color = req.body.COLOR;
  var rated = req.body.RATED;
  var studio = req.body.STUDIO;
  var numTheaters = req.body.numTheaters;
  // var image = req.body.image;
  // var image = req.body.image;

  var movies = db.read(file);
  var movie = {TITLE: title, IMAGE: image, COLOR: color, RATED: rated, STUDIO: studio, numTheaters: numTheaters};
  movies.push(movie);
  db.write(file, movies);

  res.redirect("/movies");
};
