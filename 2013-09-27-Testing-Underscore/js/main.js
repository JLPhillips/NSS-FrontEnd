function filter_evens(numbers)
{
  return _.filter(numbers, function(x){return (x % 2) == 0;});
}

function filter_odds(numbers)
{
  return _.filter(numbers, function(x){return (x % 2) == 1;});
}

function filter_short_strings(strings)
{
  return _.filter(strings, function(x){return (x.length) < 4;});
}

function filter_a_strings(strings)
{
  return _.filter(strings, function(x){return x[0].toLowerCase() == "a";});
}

function find_string(strings, word)
{
  return _.find(strings, function(x){return x == word;});
}

function find_string_end(strings, letter)
{
  return _.find(strings, function(x){return x[x.length - 1] == letter;});
}


