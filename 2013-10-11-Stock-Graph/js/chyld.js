function purchase(){
  var symbol = $("#symbol").val();
  var quantity = $("#quantity").val();
  quantity = parseInt(quantity, 10);

  // requestQuote(symbol, receiveQuote);

  requestQuote(symbol, function(data, textStatus, jqXHR){
    var quote = data.Data;

    if(quote.LastPrice * quantity <= db.balance.cash){
      db.balance.cash -= quote.LastPrice * quantity;
      db.balance.stock += quote.LastPrice*quantity;
      db.balance.total = db.balance.cash + db.balance.stock;
      Δbalance.set(db.balance);
    }
  }
}

function requestQuote(symbol,fn){
  var data = {};
  data.symbol = symbol;
  $.getJSON("url", data, fn);
}