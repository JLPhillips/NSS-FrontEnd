test("deposit", function() {
  deepEqual(deposit(0, 5), 5, "Testing deposit function." );
});

test("withdraw", function() {
  deepEqual(withdraw(10, 5), 5, "Testing withdraw function." );
});
