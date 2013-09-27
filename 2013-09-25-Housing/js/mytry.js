var rooms = [];

var confirmation = prompt("Would you like to make a new room? (Leave blank for no.)");

while(confirmation)
{
  var room = {};
  room.confirmation = confirmation;
  room.name = prompt("What is the name of this room?");
  room.size = parseInt(prompt("How many square feet is the room?"));
  room.windows = prompt("How many windows does this room have?");
  rooms.push(room);
  confirmation = prompt("Would you like to make a new room? (Leave blank for no.)");
}

var total_cost_windows = 0;
var total_cost_sqft = 0;
var total_number_windows = 0;
var total_sqft = 0;

// total_number_windows = parseInt(total_number_windows);
// total_sqft = parseInt(total_sqft);

debugger;

for(var i = 0; i < rooms.length; i++)
{
  total_cost_windows += rooms[0].windows * 250;
  total_cost_sqft += rooms[0].size * 200;
  total_number_windows += rooms[i].windows;
  total_sqft += rooms[i].size;
}

var final_price = 0;
final_price += total_cost_windows + total_cost_sqft;

console.log("Your total number of rooms is: " + rooms.length + ".");
console.log("Your total number of windows is: " + total_number_windows + ".");
console.log("Your total number of square footage is: " + total_sqft + " square feet.");
console.log("Your total cost for windows is: $" + total_cost_windows + ".");
console.log("Your total cost for square footage is: $" + total_cost_sqft + ".");
console.log("Your final total is: $" + final_price + ".");