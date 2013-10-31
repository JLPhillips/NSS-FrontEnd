// ------------------------------------------------------[/people]----------------->

var database = require("../modules/database");

exports.index = function(req, res){
  var people = database.read(__dirname + "/../db/people.json");
  res.render('people/index', { title: 'Address Book | People', people: people });
};

// ------------------------------------------------------[/people/new]----------------->

exports.new = function(req, res){
  res.render('people/new', { title: 'Address Book | New Person' });
};

// ------------------------------------------------------[/people/create]----------------->

exports.create = function(req, res){
  var name = req.body.name;
  var age = req.body.age;
  var gender = req.body.gender;
  var color = req.body.color;

  var people = database.read(__dirname + "/../db/people.json");
  var person = {NAME: name, AGE: age, GENDER: gender, COLOR: color};
  people.push(person);
  database.write(__dirname + "/../db/people.json", people);

  res.redirect('/people');
}