Template.contract.helpers({
 contracts: function(){
   Meteor.subscribe('contracts');  //serverのcontractsをsubscribeする
   return Contracts.find();  //main.jsにcontractsの配列を返す
 }
});

// below happend when btn is pushed
Template.contract.events({
  'click .btn-success': function(event) {
    event.preventDefault();

    // get abi & contract_address
    var abi = MultiplyContract.abi;
    var contract_address = $(event.target).attr('id');
    // send transaction to contract
    // accountはunlockしていないとエラーになる
    var cnt = web3.eth.contract(abi).at(contract_address);
    var transaction_address = cnt.Respond.sendTransaction(web3.eth.accounts[0], 100000, {from: web3.eth.accounts[0], gas:500000});
    alert( "購入が完了しました!!\nトランザクションアドレスは" + transaction_address );

    // 以下、contractsをupdateしてmongoに保存
    var _id = $(event.target).parent().prevAll().eq(6).text();
    var seller = $(event.target).parent().prevAll().eq(5).text();
    var price = $(event.target).parent().prevAll().eq(4).text();
    var amount = $(event.target).parent().prevAll().eq(3).text();
    var exeday = $(event.target).parent().prevAll().eq(2).text();
    var premium = $(event.target).parent().prevAll().eq(1).text();
    var position = $(event.target).parent().prevAll().eq(0).text();
    var buy_date = new Date(); // 購入日データ
    var done = "false";  //実行されたらtrueになる
    Meteor.call('update_contracts', _id, seller, price, amount, exeday, premium, position, contract_address, abi, buy_date, done, transaction_address);

    //ボタンの書き換え
    $(event.target).removeClass("btn-success").addClass("btn-default");
    $(event.target).text("購入済");
  }
});
