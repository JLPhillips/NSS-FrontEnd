function undoTransaction(){
  var $transaction = $(this);
  var cls = $transaction.attr("class");
  var amount = $transaction.text();
  amount = amount.slice(1);
  amount = parseInt(amount,10);

  if(cls === "deposit"){accountBalance -= amount;}
  else {accountBalance += amount;}

  $transaction.remove();
  accountBalance += amount;
}