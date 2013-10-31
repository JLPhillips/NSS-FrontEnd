var database = require("../modules/database");
// ------------------------------------------------------[LIST]----------------->

exports.index = function(req, res){
  var list = database.read(__dirname + "/../db/list.json");
  res.render('list/index', { title: 'To-Do List | List', list: list});
};

// ------------------------------------------------------[NEW]----------------->

exports.new = function(req, res){
  res.render('list/new', { title: 'To-Do List | New List Item'});
};

// ------------------------------------------------------[CREATE]----------------->

exports.create = function(req, res){
  var color = req.body.color;
  var tasks = req.body.item;
  var duedate = req.body.duedate;

  var items = database.read(__dirname + "/../db/list.json");
  var item = {COLOR: color, ITEM: item, DUEDATE: duedate};
  items.push(item);
  database.write(__dirname + "/../db/list.json", items);

  res.redirect('/list');
}