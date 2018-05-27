const Web3 = require('Web3');
var web3 = new Web3('https://mainnet.infura.io');
web3.eth.getBlockNumber()
.then(console.log);