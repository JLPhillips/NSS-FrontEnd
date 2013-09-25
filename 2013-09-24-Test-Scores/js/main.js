var test1 = prompt("Enter test score 1, here!");
var test2 = prompt("Enter test score 2, here!");
var test3 = prompt("Enter test score 3, here!");
var test4 = prompt("Enter test score 4, here!");
var test5 = prompt("Enter test score 5, here!");
var test6 = prompt("Enter test score 6, here!");
var test7 = prompt("Enter test score 7, here!");
var test8 = prompt("Enter test score 8, here!");
var test9 = prompt("Enter test score 9, here!");
var test10 = prompt("Enter test score 10, here!");

test1 = parseFloat(test1);
test2 = parseFloat(test2);
test3 = parseFloat(test3);
test4 = parseFloat(test4);
test5 = parseFloat(test5);
test6 = parseFloat(test6);
test7 = parseFloat(test7);
test8 = parseFloat(test8);
test9 = parseFloat(test9);
test10 = parseFloat(test10);

var sum = 0;
sum += test1;
sum += test2;
sum += test3;
sum += test4;
sum += test5;
sum += test6;
sum += test7;
sum += test8;
sum += test9;
sum += test10;

var avg = (sum / 10);
console.log("Your class's average score is: " + avg);

var variance = 0;
variance += Math.pow(test1 - avg,2) / 10;
variance += Math.pow(test2 - avg,2) / 10;
variance += Math.pow(test3 - avg,2) / 10;
variance += Math.pow(test4 - avg,2) / 10;
variance += Math.pow(test5 - avg,2) / 10;
variance += Math.pow(test6 - avg,2) / 10;
variance += Math.pow(test7 - avg,2) / 10;
variance += Math.pow(test8 - avg,2) / 10;
variance += Math.pow(test9 - avg,2) / 10;
variance += Math.pow(test10 - avg,2) / 10;

var standard_deviation = Math.sqrt(variance);
console.log("The standard deviation is: " + standard_deviation);