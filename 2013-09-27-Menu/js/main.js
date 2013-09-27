var menu = {};
menu.sections = {};
menu.total_calories = 0;
menu.number_of_sections = parseInt(prompt("Number of sections?"));

for(var i = 0; i < menu.number_of_sections; i++)
{
  var section_name = prompt("Name of section?");
  menu.sections[section_name] = [];
}

var section_list = Object.getOwnPropertyNames(menu.sections);

var response = prompt("Which menu section would you like to add an item to? Your sections are: " + section_list + ".");
while(response)
{
  var item = {};
  item.name = prompt("Item name?");
  item.calories = parseInt(prompt("Item calories?"));
  item.cost = parseFloat(prompt("Item cost?"));
  item.ingredients = prompt("Item ingredients?").split(', ');
  menu.sections[response].push(item);

  response = prompt("Which menu section would you like to add an item to? Your sections are: " + section_list + ".");
}

for(i = 0; i < section_list.length; i++)
{
  for(var j = 0; j < menu.sections[section_list[i]].length; j++)
  {
    menu.total_calories += menu.sections[section_list[i]][j].calories;
  }
}

console.log("Calories: " + menu.total_calories + ".");
