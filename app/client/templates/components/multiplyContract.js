/**
Template Controllers

@module Templates
*/

/**
The multiply contract template.

Note, the MultiplyContract object is now housed in client/lib/contracts/MultiplyContract.sol

@class [template] components_multiplyContract
@constructor
*/

// solidity source code
// var source = "" +
// "contract test {\n" +
// "   function multiply(uint a) returns(uint d) {\n" +
// "       return a * 7;\n" +
// "   }\n" +
// "}\n";

// var source = 'contract CallOption{    address public buyer;    address public seller;    uint public buyer_jpy;    uint public seller_jpy;    uint public btc_amount;    uint public btc_price;    uint public premium;    uint public exercise_date;    /* This creates an array with all balances */    mapping (address => uint) public balanceOfJPY;    mapping (address => uint) public balanceOfBTC;    mapping (address => uint) public balanceOfPremium;    function CallOption(      address _seller,      uint _seller_jpy,      uint _btc_price,      uint _btc_amount,      uint _premium,      uint _exercise_date      ){      seller = _seller;      balanceOfJPY[seller] = _seller_jpy;      btc_price = _btc_price;      btc_amount = _btc_amount;      premium = _premium;      exercise_date = _exercise_date;    }    function Respond (address _buyer, uint _buyer_jpy) {      buyer = _buyer;      balanceOfJPY[buyer] = _buyer_jpy;      if (balanceOfJPY[buyer] < premium + btc_amount * btc_price) throw;      balanceOfJPY[buyer] -= premium;      balanceOfJPY[seller] += premium;    }    function Exercise (uint _current_btc_price){      if (now < exercise_date) throw;      if (_current_btc_price < btc_price) throw;      balanceOfJPY[buyer] -= btc_price * btc_amount;      balanceOfJPY[seller] += btc_price * btc_amount;      balanceOfBTC[buyer] += btc_amount;      balanceOfBTC[seller] -= btc_amount;    }    function () {      throw;    }}'
// console.log(source);
// var sourceCompiled = web3.eth.compile.solidity(source);
// console.log(sourceCompiled);
// var contractAbiDefinition = sourceCompiled.CallOption.info.abiDefinition;
// var contractData = sourceCompiled.CallOption.code;
// var MyContract = web3.eth.contract(contractAbiDefinition);
// var contractInstance = MyContract.new(web3.eth.accounts[0],100000, 50000, 1, 5000, 1460958179, {from:web3.eth.accounts[0], data: contractData, gas:500000});
// console.log(contractInstance);

// var isConnected = web3.isConnected();
// console.log(isConnected);
// var accounts = web3.eth.accounts;
// console.log(accounts);
// var abi = [{    constant: true,    inputs: [],    name: "seller",    outputs: [{        name: "",        type: "address"    }],    type: "function"}, {    constant: true,    inputs: [{        name: "",        type: "address"    }],    name: "balanceOfBTC",    outputs: [{        name: "",        type: "uint256"    }],    type: "function"}, {    constant: true,    inputs: [],    name: "buyer_jpy",    outputs: [{        name: "",        type: "uint256"    }],    type: "function"}, {    constant: true,    inputs: [],    name: "exercise_date",    outputs: [{        name: "",        type: "uint256"    }],    type: "function"}, {    constant: false,    inputs: [{        name: "_buyer",        type: "address"    }, {        name: "_buyer_jpy",        type: "uint256"    }],    name: "Respond",    outputs: [],    type: "function"}, {    constant: true,    inputs: [],    name: "buyer",    outputs: [{        name: "",        type: "address"    }],    type: "function"}, {    constant: true,    inputs: [],    name: "btc_price",    outputs: [{        name: "",        type: "uint256"    }],    type: "function"}, {    constant: false,    inputs: [{        name: "_current_btc_price",        type: "uint256"    }],    name: "Exercise",    outputs: [],    type: "function"}, {    constant: true,    inputs: [{        name: "",        type: "address"    }],    name: "balanceOfJPY",    outputs: [{        name: "",        type: "uint256"    }],    type: "function"}, {    constant: true,    inputs: [],    name: "btc_amount",    outputs: [{        name: "",        type: "uint256"    }],    type: "function"}, {    constant: true,    inputs: [{        name: "",        type: "address"    }],    name: "balanceOfPremium",    outputs: [{        name: "",        type: "uint256"    }],    type: "function"}, {    constant: true,    inputs: [],    name: "premium",    outputs: [{        name: "",        type: "uint256"    }],    type: "function"}, {    constant: true,    inputs: [],    name: "seller_jpy",    outputs: [{        name: "",        type: "uint256"    }],    type: "function"}, {    inputs: [{        name: "_seller",        type: "address"    }, {        name: "_seller_jpy",        type: "uint256"    }, {        name: "_btc_price",        type: "uint256"    }, {        name: "_btc_amount",        type: "uint256"    }, {        name: "_premium",        type: "uint256"    }, {        name: "_exercise_date",        type: "uint256"    }],    type: "constructor"}]
// var address = '0xea0531e8f78a4c5351ca6cee93b375b89a1bad8e'
// var cnt = web3.eth.contract(abi).at(address);
// var result = cnt.Respond.sendTransaction(web3.eth.accounts[1], 100000, {from: web3.eth.accounts[0], gas:500000});
// console.log(result);

// Construct Multiply Contract Object and contract instance
var contractInstance;

// When the template is rendered
Template['components_multiplyContract'].onRendered(function(){
    TemplateVar.set('state', {isInactive: true});
});

Template['components_multiplyContract'].helpers({

	/**
	Get multiply contract source code.

	@method (source)
	*/

	'source': function(){
		return source;
	},
});

Template['components_multiplyContract'].events({

	/**
	On "Create New Contract" click

	@event (click .btn-default)
	*/

//  'submit .conditions': function(event) {
//    event.preventDefault();
//    console.log(MultiplyContract.abi);
//    var price = event.target.price.value;
//    var amount = event.target.amount.value;
//    var exeday = event.target.exeday.value;
//    var premium = event.target.premium.value;
//    var position = event.target.position.value;
//    console.log(price);
//    console.log(amount);
//    console.log(exeday);
//    console.log(premium);
//    console.log(position);
//    },

//	"click .btn-default": function(event, template){ // Create Contract
	"submit .conditions": function(event, template){ // Create Contract
        TemplateVar.set('state', {isMining: true});
        event.preventDefault();

        // Set coinbase as the default account
        web3.eth.defaultAccount = web3.eth.coinbase;

        // Get Abi definition
        var abi = MultiplyContract.abi

        // assemble the tx object w/ default gas value
        var transactionObject = {
            data: MultiplyContract.bytecode,
            gasPrice: web3.eth.gasPrice,
            gas: 5000000,
            from: web3.eth.accounts[0]
        };
         var address = web3.eth.accounts[0];
         var price = event.target.price.value;
         var amount = event.target.amount.value;
         var exeday = event.target.exeday.value;
         var premium = event.target.premium.value;
         var position = event.target.position.value;

      // estimate gas cost then transact new MultiplyContract
        web3.eth.estimateGas(transactionObject, function(err, estimateGas){
            // multiply by 10 hack for testing
            if(!err)
                transactionObject.gas = estimateGas * 10;

            MultiplyContract.new(price, amount, exeday, premium, position, transactionObject,
                                 function(err, contract){
                if(err)
                    return TemplateVar.set(template, 'state', {isError: true, error: String(err)});

                if(contract.address) {
                    TemplateVar.set(template, 'state', {isMined: true, address: contract.address, source: source});
                    contractInstance = contract;
                }
            });
        });
	},


	/**
	On Multiply Number Input keyup

	@event (keyup #multiplyValue)
	*/

	"keyup #multiplyValue": function(event, template){
        // the input value
		var value = template.find("#multiplyValue").value;

        // call MultiplyContract method `multiply` which should multiply the `value` by 7
		contractInstance.multiply.call(value, function(err, result){
            TemplateVar.set(template, 'multiplyResult'
                            , result.toNumber(10));

            if(err)
                TemplateVar.set(template, 'multplyResult'
                                , String(err));
        });
	},
});
