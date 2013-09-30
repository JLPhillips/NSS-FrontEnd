// test( "function name", function() {
//   deepEqual(actual value, expected value, "message");
//   deepEqual(actual value, expected value, "message");
// });

test( "1 + 1", function() {
  deepEqual(1 + 1, 2, "Adding 1 and 1.");
});

test( "Nashville[0]", function() {
  deepEqual("Nashville"[0], "N", "Selecting the first letter of the string.");
});

test( "add_three", function() {
  deepEqual(add_three(5), 8, "Testing the add_three function with 5.");
  deepEqual(add_three(7), 10, "Testing the add_three function with 7.");
});

test( "square", function() {
  deepEqual(square(3), 9, "Testing the square function with 3.");
  deepEqual(square(5), 25, "Testing the square function with 5.");
});

test( "area", function() {
  deepEqual(area(3, 5), 15, "Testing the area function with 3 and 5.");
  deepEqual(area(7, 5), 35, "Testing the square function with 7 and 5.");
});

test( "volume", function() {
  deepEqual(volume(3, 5, 2), 30, "Testing the area function with 3, 5, and 2.");
  deepEqual(volume(7, 5, 2), 70, "Testing the square function with 7, 5, and 2.");
});

test( "power", function() {
  deepEqual(power(2, 0), 1, "Testing the power function with 2 to the 1st power.");
  deepEqual(power(2, 1), 2, "Testing the power function with 2 to the 2nd power.");
  deepEqual(power(2, 2), 4, "Testing the power function with 2 to the 3rd power.");
  deepEqual(power(2, 3), 8, "Testing the power function with 2 to the 4th power.");
});

test( "greeting", function() {
  deepEqual(greeting("hello", "carol"), "hello, carol.", "Testing the greeting function.");
});

test( "pig_latin", function() {
  deepEqual(pig_latin("hello"), "ellohay", "Testing the pig_latin function.");
});

test( "pig_greeting", function() {
  deepEqual(pig_greeting("hello", "carol"), "ellohay, arolcay.", "Testing the pig_greeting function.");
});

test( "pig_sentence", function() {
  var sentence = "four score and seven years ago";
  var expected = "ourfay coresay ndaay evensay earsyay goaay";
  deepEqual(pig_sentence(sentence), expected, "Testing the pig_sentence function.");
});
