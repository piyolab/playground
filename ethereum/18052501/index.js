const EthereumTx = require('ethereumjs-tx');
const Web3 = require('Web3');
// const ethValue = '0.01';
// const weiValue = Web3.utils.toWei(ethValue, 'ether');
// console.log(weiValue);
// const hexWeiValue = Web3.utils.toHex(weiValue);
// console.log(hexWeiValue);

// const gasPrice = '20000000000';
// const hexGasPrice = Web3.utils.toHex(gasPrice);
// console.log(hexGasPrice);

// const gasLimit = '21000';
// const hexGasLimit = Web3.utils.toHex(gasLimit);
// console.log(hexGasLimit);

const txParams = {
  nonce: '0x00',
  gasPrice: '0x4a817c800',    // 20000000000
  gasLimit: '0x5208',         // 21000
  to: '0x2890228D4478e2c3B0eBf5a38479E3396C1d6074', 
  value: '0x2386f26fc10000',  // 0.01
  data: null,
  chainId: 3  //  mainnet: 1, ropsten: 3
}
const tx = new EthereumTx(txParams);

const privateKey = Buffer.from('61ce8b95ca5fd6f55cd97ac60817777bdf64f1670e903758ce53efc32c3dffeb', 'hex');
tx.sign(privateKey);

const serializedTx = tx.serialize();
const signedTx = '0x' + serializedTx.toString('hex');
console.log(signedTx);

var web3 = new Web3('wss://ropsten.infura.io/ws');      // Ropsten
// var web3 = new Web3('wss://mainnet.infura.io/ws');   // Mainnet

web3.eth.sendSignedTransaction(signedTx)
.on('transactionHash', function(hash){
  console.log(hash);
})
