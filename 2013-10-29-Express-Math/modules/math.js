exports.square = function(x){
  return Math.pow(x,2);
};

exports.area = function(x,y){
  return x * y;
};

exports.volume = function(x,y,z){
  return this.area(x, y) * z;
};