
/*
 * GET home page.
 */

var math = require("../modules/math");

exports.index = function(req, res){



  res.render('index', { title: 'EXPRESS', square: math.square(3), area: math.area(3,4), volume: math.volume(3,4,5) });
};