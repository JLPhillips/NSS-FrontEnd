var items = [];

var add = prompt("Add a new menu item? (Leave blank for no.)");

while(add)
{
  var item = {};
  item.name = prompt("What is the name of the item?");
  item.category = prompt("What category of food item is it?");
  item.price = parseFloat(prompt("How much does it cost?"));
  item.calories = parseFloat(prompt("How many calories does it have?"));
  item.ingredients = prompt("List the ingredients, seperated by a comma.");
  items.push(item);
  add = prompt("Add a new menu item? (Leave blank for no.)");
}

for(var i = 0; i < items.length; i++)
{
  console.log(items[0].category + items[0].name + "(" + items[0].ingredients + ")" + "$" + items[0].price + ".");
}


