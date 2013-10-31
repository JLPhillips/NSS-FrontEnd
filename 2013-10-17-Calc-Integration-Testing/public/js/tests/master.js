"use strict";

module("Integration Testing", {setup: setupTest, teardown: teardownTest});

function setupTest(){
}

function teardownTest(){
}

test("Calculate 2 numbers", function(){
  expect(1);

  $("#op1").val("3");
  $("#op2").val("2");
  $("#operator").val("*");

  $("#calculate").trigger("click");

  // deepEqual($("#op1").val(), "", "Op1 should be blank.");
  // deepEqual($("#op2").val(), "", "Op2 should be blank.");
  // deepEqual($("#operator").val(), "", "Operator should be blank.");
  deepEqual($("#result").text(), "6", "Result should be 6.");
});

// test("paper trail", function(){
//   expect(13);

//   $("#op1").val("3");
//   $("#op2").val("2");
//   $("#operator").val("+");
//   $("#calculate").trigger("click");

//   deepEqual($("#history > li").length, 1, "Should have 1 li.");

//   $("#op1").val("7");
//   $("#op2").val("8");
//   $("#operator").val("*");
//   $("#calculate").trigger("click");

//   deepEqual($("#history > li").length, 2, "Should have 2 li's.");
//   deepEqual($("#history > li:first-child > span").length, 5, "Should have 5 spans.");
//   ok($("#history > li:first-child > span:first-child").hasClass("op1"), "Should have op1 class for first span.");
//   ok($("#history > li:first-child > span:nth-child(2)").hasClass("operator"), "Should have operator class for first span.");
//   ok($("#history > li:first-child > span:nth-child(3)").hasClass("op2"), "Should have op1 class for first span");
//   ok($("#history > li:first-child > span:nth-child(4)").hasClass("equal"), "Should have equal class for first span");
//   ok($("#history > li:first-child > span:nth-child(5)").hasClass("result"), "Should have result class for first span");
//   deepEqual($("#history > li:first-child > span:nth-child(1)").text(), "7", "should have 7 in top row for op1");
//   deepEqual($("#history > li:first-child > span:nth-child(2)").text(), "*", "should have * in top row for operator");
//   deepEqual($("#history > li:first-child > span:nth-child(3)").text(), "8", "should have 8 in top row for op2");
//   deepEqual($("#history > li:first-child > span:nth-child(4)").text(), "=", "should have = in top row for equal");
//   deepEqual($("#history > li:first-child > span:nth-child(5)").text(), "56", "should have 56 in top row for result");
//   start();
// });
