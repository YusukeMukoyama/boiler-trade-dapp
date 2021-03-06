contract CallOption{
    address public buyer;
    address public seller;
    uint public buyer_jpy;
    uint public seller_jpy;
    uint public btc_amount;
    uint public btc_price;
    uint public premium;
    uint public exercise_date;

    /* This creates an array with all balances */
    mapping (address => uint) public balanceOfJPY;
    mapping (address => uint) public balanceOfBTC;
    mapping (address => uint) public balanceOfPremium;

    function CallOption(
      address _seller,
      uint _seller_jpy,
      uint _btc_price,
      uint _btc_amount,
      uint _premium,
      uint _exercise_date
      ){
      seller = _seller;
      balanceOfJPY[seller] = _seller_jpy;
      btc_price = _btc_price;
      btc_amount = _btc_amount;
      premium = _premium;
      exercise_date = _exercise_date;
    }

    function Respond (address _buyer, uint _buyer_jpy) {
      buyer = _buyer;
      /*ここ、毎度buyer_jpyが初期化されてしまう。要修正*/
      balanceOfJPY[buyer] = _buyer_jpy;
      if (balanceOfJPY[buyer] < premium + btc_amount * btc_price) throw;
      balanceOfJPY[buyer] -= premium;
      balanceOfJPY[seller] += premium;
    }

    function Exercise (uint _current_btc_price, uint _current_time){
      if (_current_time < exercise_date) throw;
      if (_current_btc_price < btc_price) throw;
      balanceOfJPY[buyer] -= btc_price * btc_amount;
      balanceOfJPY[seller] += btc_price * btc_amount;
      balanceOfBTC[buyer] += btc_amount;
      balanceOfBTC[seller] -= btc_amount;
    }
    function () {
      throw;
    }
}
