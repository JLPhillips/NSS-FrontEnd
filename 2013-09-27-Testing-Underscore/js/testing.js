test( "Filter Even Numbers", function() {
  var numbers = _.range(10);
  var expected = _.range(0, 10, 2);
  deepEqual(filter_evens(numbers), expected, "Testing the filter_evens function.");
});

test( "Filter Odd Numbers", function () {
  var numbers = _.range(10);
  var expected = [1,3,5,7,9];
  deepEqual(filter_odds(numbers), expected, "Testing the filter_odds function.");
});

test( "Filter 'Short' Strings", function () {
  var strings = ["hello", "there", "a", "the", "cat", "elephant", "encyclopedia"];
  var expected = ["a", "the", "cat"];
  deepEqual(filter_short_strings(strings), expected, "Testing short strings under 4 characters.");
});

test( "Filter 'A' Strings", function () {
  var strings = ["apple", "there", "a", "the", "cat", "Aardvark", "encyclopedia"];
  var expected = ["apple", "a", "Aardvark"];
  deepEqual(filter_a_strings(strings), expected, "Strings should begin with the letter 'A'.");
});

test( "Find a String", function () {
  var strings = ["apple", "there", "a", "the", "cat", "Aardvark", "elephant", "encyclopedia"];
  deepEqual(find_string(strings, "elephant"), "elephant", "Should find 'elephant' in the array.");
  deepEqual(find_string(strings, "Aardvark"), "Aardvark", "Should find 'Aardvark' in the array.");
  deepEqual(find_string(strings, "cat"), "cat", "Should find 'cat' in the array.");
  deepEqual(find_string(strings, "not here"), undefined, "Should not find the string in the array.");
});

test( "Find a string ending in a particular letter", function () {
  var strings = ["dog", "cats", "lion", "tigers"];
  deepEqual(find_string_end(strings, "s"), "cats", "Should find the first word ending with s in the array.");
  deepEqual(find_string_end(strings, "z"), undefined, "Should not find the string in the array.");
});

