function add_three(x)
{
  return x + 3;
}

function square(x)
{
  return x * x;
}

function area(length,width)
{
  return length * width;
}

function volume(length,width,height)
{
  return area(length,width) * height;
}

function power(number,exponent)
{
  var answer = 1;
  for(var i = 0; i < exponent; i++){answer *= number;}
  return answer;
}

function greeting(salutation,name)
{
  return salutation + ", " + name + ".";
}

function pig_latin(word)
{
  return word.slice(1) + word[0] + "ay";
}

function pig_greeting(salutation,name)
{
  return pig_latin(salutation) + ", " + pig_latin(name) + ".";
}

function pig_sentence(sentence)
{
  var words = sentence.split(" ");
  var pig_words = [];
  for (var i = 0; i < words.length; i++)
  {
    pig_words.push(pig_latin(words[i]));
  }
  return pig_words.join(" ");
}