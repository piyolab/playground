const INFURA_API_KEY = '';
const HTTP_PROVIDER_URL = 'http://ropsten.infura.io/';

const DEFAULT_MULTI_SIG_WALLET_ADDRESS = '0x1370f0273a409a01b36989b8c5ff8c3e42989e14';
const DEFAULT_MULTI_SIG_WALLET_ABI = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"owners","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"owner","type":"address"}],"name":"removeOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"transactionId","type":"uint256"}],"name":"revokeConfirmation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"address"}],"name":"confirmations","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"pending","type":"bool"},{"name":"executed","type":"bool"}],"name":"getTransactionCount","outputs":[{"name":"count","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"owner","type":"address"}],"name":"addOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"transactionId","type":"uint256"}],"name":"isConfirmed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"transactionId","type":"uint256"}],"name":"getConfirmationCount","outputs":[{"name":"count","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"transactions","outputs":[{"name":"destination","type":"address"},{"name":"value","type":"uint256"},{"name":"data","type":"bytes"},{"name":"executed","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getOwners","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"from","type":"uint256"},{"name":"to","type":"uint256"},{"name":"pending","type":"bool"},{"name":"executed","type":"bool"}],"name":"getTransactionIds","outputs":[{"name":"_transactionIds","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"transactionId","type":"uint256"}],"name":"getConfirmations","outputs":[{"name":"_confirmations","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"transactionCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_required","type":"uint256"}],"name":"changeRequirement","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"transactionId","type":"uint256"}],"name":"confirmTransaction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"destination","type":"address"},{"name":"value","type":"uint256"},{"name":"data","type":"bytes"}],"name":"submitTransaction","outputs":[{"name":"transactionId","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MAX_OWNER_COUNT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"required","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"owner","type":"address"},{"name":"newOwner","type":"address"}],"name":"replaceOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"transactionId","type":"uint256"}],"name":"executeTransaction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_owners","type":"address[]"},{"name":"_required","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":true,"name":"transactionId","type":"uint256"}],"name":"Confirmation","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":true,"name":"transactionId","type":"uint256"}],"name":"Revocation","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"transactionId","type":"uint256"}],"name":"Submission","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"transactionId","type":"uint256"}],"name":"Execution","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"transactionId","type":"uint256"}],"name":"ExecutionFailure","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"}],"name":"OwnerAddition","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"}],"name":"OwnerRemoval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"required","type":"uint256"}],"name":"RequirementChange","type":"event"}];

const DEFAULT_GAS_LIMIT = 210000;
const DEFAULT_GAS_PRICE = 21000000000;

const wallet = {};

function toEtherValue(value) {
	return value / 10000;
}

// URL パラメータを取得	
function getUrlParams() {
	var params  = new Object;
	const url = location.search.substring(1).split('&');
	for(i=0; url[i]; i++) {
	    var p = url[i].split('=');
	    params[p[0]] = p[1];
	}
	return params;
}


// Wallet 情報を初期化
function initWallet() {
	const params = getUrlParams();

	if (params.address) {
		wallet.address = params.address;
	} else {
		wallet.address = DEFAULT_MULTI_SIG_WALLET_ADDRESS;
	}

	// フォームでupdateするようにする
	if(params.abi) {
		wallet.abi = params.abi;
	} else {
		wallet.abi = DEFAULT_MULTI_SIG_WALLET_ABI;
	}

	wallet.contract = window.web3.eth.contract(wallet.abi).at(wallet.address);
}


// Wallet 情報を表示
function displayWalletInfo() {
	$('#address').val(wallet.address);
	$('#abi').val(JSON.stringify(wallet.abi));

	// MultiSigWallet の Owner アドレスを取得
	(function(method) { wallet.contract[method](function(error, result){
	    $('#owners').val(result);
	});})('getOwners');

	// MultiSigWallet の ETH バランスを取得
	(function(method) { window.web3.eth[method](wallet.address, function(error, result){
		// console.log(result);
	    $('#eth_balance').text(toEtherValue(result.c[0]));
	});})('getBalance');
}



function registerTransactionCount() {
	$('#get_tx_count').click(function(e) {
		wallet.contract.transactionCount.call(function(error, result){
			console.log(result);
			$('#get_tx_count_result').text('tx count: ' + result.c[0]);
		});
	});
}



function registerConfirmationCount() {
	$('#get_confirm_count').click(function(e) {
		const txId = $('#get_confirm_count_txid').val();
		wallet.contract.getConfirmationCount.call(txId, function(error, result){
			console.log(result);
			$('#get_confirm_count_result').text('confirmation count: ' + result.c[0]);
		});
	});
}



function registerGetTransaction() {
	$('#get_tx').click(function(e) {
		const txId = $('#get_tx_txid').val();
		wallet.contract.transactions.call(txId, function(error, result){
			// console.log(result);
			const destination = result[0];
			const value = toEtherValue(result[1]['c'][0]);
			const data = result[2];
			const executed = result[3];
			$('#get_tx_result').val('destination: ' + destination + '\n'
									+ 'value: ' + value + '\n'
									+ 'data: ' + data + '\n'
									+ 'executed: ' + executed + '\n');
		});
	});
}



function submitTransaction(toAddress, ethValue, data, callback) {
	const txObj = {};
	txObj.gasLimit = DEFAULT_GAS_LIMIT;
	txObj.gasPrice = DEFAULT_GAS_PRICE;
	const weiValue = window.web3.toWei(ethValue, 'ether');
	if(!data) data = '0x00';
	wallet.contract.submitTransaction(toAddress, weiValue, data, txObj, function(error, result){
 		callback(error, result);
    });
}



// Submit Transaction のボタンを押下したときに実行されます。
function registerSubmitTransaction() {
    $('#submit_tx').click(function(e) {
    	const address = $('#submit_tx_address').val();
    	const value = $('#submit_tx_value').val();
    	const data = $('#submit_tx_data').val();
    	submitTransaction(address, value, data, function(error, result) {
    		$('#submit_tx_hash').val(result);
    	});
    });
}



function confirmTransaction(txId, callback) {
	const txObj = {};
	txObj.gasLimit = DEFAULT_GAS_LIMIT;
	txObj.gasPrice = DEFAULT_GAS_PRICE;
	wallet.contract.confirmTransaction(txId, txObj, function(error, result){
 		callback(error, result);
    });
}



function registerConfirmTransaction() {
	$('#confirm_tx').click(function(e) {
		const txId = $('#confirm_tx_txid').val();
    	confirmTransaction(txId, function(error, result) {
    		$('#confirm_tx_hash').val(result);
    	});
    });
}



function executeTransaction(txId, callback) {
	const txObj = {};
	txObj.gasLimit = DEFAULT_GAS_LIMIT;
	txObj.gasPrice = DEFAULT_GAS_PRICE;
	wallet.contract.executeTransaction(txId, txObj, function(error, result){
 		callback(error, result);
    });
}



function registerExecuteTransaction() {
	$('#execute_tx').click(function(e) {
		const txId = $('#execute_tx_txid').val();
    	executeTransaction(txId, function(error, result) {
    		$('#execute_tx_hash').val(result);
    	});
    });
}


function registerCreateOptData() {

    // $('#create_opt_data').click(function(e) {
    // 	const functionStr = $('#create_opt_data_function').val();
    // 	const params = $('#create_opt_data_params').val();
    // });
}


$(document).ready(function(){
	
	if (typeof web3 !== 'undefined') {
    	// Use Mist/MetaMask's provider
    	console.log('Using MetaMask!')
	    window.web3 = new Web3(web3.currentProvider);
	} else {
		window.web3 = new Web3(new Web3.providers.HttpProvider(HTTP_PROVIDER_URL + INFURA_API_KEY));
	}

	initWallet();
	displayWalletInfo();
	
	registerTransactionCount();
	registerConfirmationCount();
	registerGetTransaction();

	registerSubmitTransaction();
	registerConfirmTransaction();
	registerExecuteTransaction();

	registerCreateOptData();

});


