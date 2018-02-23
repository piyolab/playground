const INFURA_API_KEY = '';
const HTTP_PROVIDER_URL = 'wss://ropsten.infura.io/ws';

const DEFAULT_MULTI_SIG_WALLET_ADDRESS = '0x1370f0273a409a01b36989b8c5ff8c3e42989e14';
const DEFAULT_MULTI_SIG_WALLET_ABI = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"owners","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"owner","type":"address"}],"name":"removeOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"transactionId","type":"uint256"}],"name":"revokeConfirmation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"address"}],"name":"confirmations","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"pending","type":"bool"},{"name":"executed","type":"bool"}],"name":"getTransactionCount","outputs":[{"name":"count","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"owner","type":"address"}],"name":"addOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"transactionId","type":"uint256"}],"name":"isConfirmed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"transactionId","type":"uint256"}],"name":"getConfirmationCount","outputs":[{"name":"count","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"transactions","outputs":[{"name":"destination","type":"address"},{"name":"value","type":"uint256"},{"name":"data","type":"bytes"},{"name":"executed","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getOwners","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"from","type":"uint256"},{"name":"to","type":"uint256"},{"name":"pending","type":"bool"},{"name":"executed","type":"bool"}],"name":"getTransactionIds","outputs":[{"name":"_transactionIds","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"transactionId","type":"uint256"}],"name":"getConfirmations","outputs":[{"name":"_confirmations","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"transactionCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_required","type":"uint256"}],"name":"changeRequirement","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"transactionId","type":"uint256"}],"name":"confirmTransaction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"destination","type":"address"},{"name":"value","type":"uint256"},{"name":"data","type":"bytes"}],"name":"submitTransaction","outputs":[{"name":"transactionId","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MAX_OWNER_COUNT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"required","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"owner","type":"address"},{"name":"newOwner","type":"address"}],"name":"replaceOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"transactionId","type":"uint256"}],"name":"executeTransaction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_owners","type":"address[]"},{"name":"_required","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":true,"name":"transactionId","type":"uint256"}],"name":"Confirmation","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":true,"name":"transactionId","type":"uint256"}],"name":"Revocation","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"transactionId","type":"uint256"}],"name":"Submission","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"transactionId","type":"uint256"}],"name":"Execution","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"transactionId","type":"uint256"}],"name":"ExecutionFailure","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"}],"name":"OwnerAddition","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"}],"name":"OwnerRemoval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"required","type":"uint256"}],"name":"RequirementChange","type":"event"}];

const DEFAULT_GAS_LIMIT = 210000;
const DEFAULT_GAS_PRICE = 21000000000;

const wallet = {};


// TODO 1.x 移行に伴い削除
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

	wallet.contract = new window.web3.eth.Contract(wallet.abi, wallet.address);

	// TODO
	// default account の設定もっといい方法ないかな？
	// これだと、途中で metamask のアカウント変更に対応できない気が
	window.web3.eth.getAccounts()
	.then(function(data) {
		console.log(data);
		window.web3.defaultAccount = data[0];
		console.log(window.web3.defaultAccount);
	})
}


// Wallet 情報を表示
function displayWalletInfo() {
	$('#address').val(wallet.address);
	$('#abi').val(JSON.stringify(wallet.abi));

	// MultiSigWallet の Owner アドレスを取得
	wallet.contract.methods.getOwners().call(function(error, result){
	    $('#owners').val(result);
	});

	// MultiSigWallet の ETH バランスを取得
	window.web3.eth.getBalance(wallet.address)
	.then(function(data){
		console.log(data);
		$('#eth_balance').text(window.web3.utils.fromWei(data, 'ether'));
	});
}


// トランザクション数を取得
function registerTransactionCount() {
	$('#get_tx_count').click(function(e) {
		wallet.contract.methods.transactionCount().call(function(error, result){
			console.log(result);
			$('#get_tx_count_result').text('tx count: ' + result);
		});
	});
}


// Confirmation 数を取得
function registerConfirmationCount() {
	$('#get_confirm_count').click(function(e) {
		const txId = $('#get_confirm_count_txid').val();
		wallet.contract.methods.getConfirmationCount(txId).call(function(error, result){
			console.log(result);
			$('#get_confirm_count_result').text('confirmation count: ' + result);
		});
	});
}


// トランザクション内容を取得	
function registerGetTransaction() {
	$('#get_tx').click(function(e) {
		const txId = $('#get_tx_txid').val();
		wallet.contract.methods.transactions(txId).call(function(error, result){
			console.log(result);
			const destination = result[0];
			const value = window.web3.utils.fromWei(result[1], 'ether');
			const data = result[2];
			const executed = result[3];
			$('#get_tx_result').val('destination: ' + destination + '\n'
									+ 'value: ' + value + '\n'
									+ 'data: ' + data + '\n'
									+ 'executed: ' + executed + '\n');
		});
	});
}


// Create optional data のボタンを押下したときに実行されます。
function registerCreateOptData() {

    // $('#create_opt_data').click(function(e) {
    // 	const functionStr = $('#create_opt_data_function').val();
    // 	const params = $('#create_opt_data_params').val();
    // });
}


function createTxObj() {
	const txObj = {};
	txObj.from = window.web3.defaultAccount;
	txObj.gas = DEFAULT_GAS_LIMIT;
	txObj.gasPrice = DEFAULT_GAS_PRICE;
	return txObj;
}

// トランザクションをsubmitします
// function submitTransaction(toAddress, ethValue, data, callback) {
function submitTransaction(toAddress, ethValue, data) {
	const txObj = createTxObj();
	const weiValue = window.web3.utils.toWei(ethValue, 'ether');
	if(!data) data = '0x00';
	// Promise を返す
 	return wallet.contract.methods.submitTransaction(toAddress, weiValue, data).send(txObj);
}



// Submit Transaction のボタンを押下したときに実行されます。
function registerSubmitTransaction() {
    $('#submit_tx').click(function(e) {
    	const address = $('#submit_tx_address').val();
    	const value = $('#submit_tx_value').val();
    	const data = $('#submit_tx_data').val();
    	submitTransaction(address, value, data)
		.on('transactionHash', function(hash){
	    	console.log('hash: ' + hash);
	    	$('#submit_tx_hash').val(hash);
		})
		.on('receipt', function(receipt){
		    console.log('receipt: ', receipt);
		    const transactionId = receipt.events.Submission.returnValues.transactionId;
		    const gasUsed = receipt.gasUsed;
		    const cumulativeGasUsed = receipt.cumulativeGasUsed;
			$('#submit_tx_result').val('transactionId: ' + transactionId + '\n'
								+ 'gasUsed: ' + gasUsed + '\n'
								+ 'cumulativeGasUsed: ' + cumulativeGasUsed + '\n');
		})
		// .on('confirmation', function(confirmationNumber, receipt){
		// 	// events > Submission > returnValues > transactionId をみるべきっぽい
		//     console.log('confirmationNumber: ' + confirmationNumber);
		//     console.log('receipt: ', receipt);
		// })
		.on('error', console.error);
       	// submitTransaction(address, value, data, function(error, result) {
    	// 	$('#submit_tx_hash').val(result);
    	// });
    });
}


// トランザクションを confirm します。	
function confirmTransaction(txId) {
	const txObj = createTxObj();
	return wallet.contract.methods.confirmTransaction(txId).send(txObj);
}


// Confirm Transaction のボタンを押下したときに実行されます。
function registerConfirmTransaction() {
	$('#confirm_tx').click(function(e) {
		const txId = $('#confirm_tx_txid').val();
    	confirmTransaction(txId)
		.on('transactionHash', function(hash){
	    	$('#confirm_tx_hash').val(hash);   	
    	});
    });
}


// トランザクションを execute します。	
function executeTransaction(txId) {
	const txObj = createTxObj();
	return wallet.contract.methods.executeTransaction(txId).send(txObj);
}


// Execute Transaction のボタンを押下したときに実行されます。
function registerExecuteTransaction() {
	$('#execute_tx').click(function(e) {
		const txId = $('#execute_tx_txid').val();
		executeTransaction(txId)
		.on('transactionHash', function(hash){
	    	$('#execute_tx_hash').val(hash);   	
    	});
    });
}



$(document).ready(function(){
	
	if (typeof web3 !== 'undefined') {
    	// Use Mist/MetaMask's provider
    	console.log('Using MetaMask!')
	    window.web3 = new Web3(web3.currentProvider);
	} else {
		// window.web3 = new Web3(new Web3.providers.HttpProvider(HTTP_PROVIDER_URL + INFURA_API_KEY));
		window.web3 = new Web3(Web3.givenProvider || new Web3.providers.WebsocketProvider(HTTP_PROVIDER_URL + INFURA_API_KEY));
	}

	initWallet();
	displayWalletInfo();
	
	registerTransactionCount();
	registerConfirmationCount();
	registerGetTransaction();

	registerCreateOptData();
	registerSubmitTransaction();
	registerConfirmTransaction();
	registerExecuteTransaction();

	console.log(web3.version);	
});


