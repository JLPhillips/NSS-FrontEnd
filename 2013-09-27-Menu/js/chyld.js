var menu = {};
menu.sections = {};
menu.number_of_sections = parseInt(prompt("Number of sections?"));

for(var i = 0; i < menu.number_of_sections; i++)
{
  var section_name = prompt("Name of section?");
  menu.sections[section_name] = [];
}

var response = prompt("Menu section? (Leave blank to exit.)");
while(response)
{
  var item = {};
  item.name = prompt("Item name?");
  item.calories = parseInt(prompt("Item calories?"));
  item.cost = parseFloat(prompt("Item cost?"));
  item.ingredients = prompt("Item ingredients?").split(', ');
  menu.sections[response].push(item);

  response = prompt("Menu section? (Leave blank to exit.)");
}
