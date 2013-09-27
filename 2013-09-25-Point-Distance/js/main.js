var points = [];

// debugger;

for(var i = 0; i < 2; i++)
{
  var point = {};
  point.x = parseInt(prompt("Enter the X value for a new point."));
  point.y = parseInt(prompt("Now, enter the Y value."));
  points.push(point);
}

var a = points[0].y - points[1].y;
var b = points[0].x - points[1].x;

var distance = Math.sqrt(a*a + b*b);
// OR
// var distance = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));



for(i = 0; i < points.length; i++)
{
  console.log('The x point is: ' + points[i].x);
  console.log('The y point is: ' + points[i].y);
}


// console.log("Your points are: " + points + ".");
// console.log("Side a is :"+ a + " units long.");
// console.log("Side b is :"+ b + " units long.");
// console.log("Your distance between points is: " + distance + " units long.");