/* this is a multi-line
    javascript
    comment
*/

var first_name = prompt("First name?");
var last_name = prompt("Last name?");
var gender = prompt("What is your gender?");
var age = prompt("What is your age?");
age = parseInt(age);
var bday_month = prompt("What month were you born in?");
var current_month = prompt("What month is it right now?");
var full_name = first_name + ' ' + last_name;

//debugger;

var test1 = prompt("First score?");
test1 = parseFloat(test1);

var test2 = prompt("Second score?");
test2 = parseFloat(test2);

var test3 = prompt("Last score?");
test3 = parseFloat(test3);

var sum = 0;
sum += test1;
sum += test2;
sum += test3;

// var average = (test1 + test2 + test3) / 3;

var average = sum / 3;

if(average < 60)
  console.log("You failed!");
else if((average >= 60) && (average <70))
  console.log("You got a D!");
else if((average >= 70) && (average < 80))
  console.log("You got a C!");
else if((average >= 80) && (average < 90))
  console.log("You got a B!");
else
  console.log("You got an A!");

console.log("Your full name is : " + full_name);
console.log("The average of your test scores is : " + average);

var null_variable = null, undefined_variable;

if((first_name == 'JL') && (last_name == 'Phillips'))
  console.log('Hey, I recognize you!');

if((gender == 'female') && (age >= 21))
  console.log("Free drinks! Ladies Night! Woooooot!!");
else if((gender == 'male') && (age >= 21))
  console.log("Looks like you're buying!");
else
  console.log("Not old enough to drink? Sorry!");

var can_have_cake = (current_month == bday_month) ? true : false;
var cake = can_have_cake ? "cake!" : "dirt!";
  console.log("Marie Antoinette says that you are eating " + cake);

switch(bday_month)
{
  case 'January':
    console.log("You are a Capricorn!");
    break;
  case 'February':
    console.log("You are a Pices!")
    break;
  default:
    console.log("You are not of this world. God speed!");
}
