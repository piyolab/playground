var $ = require('jquery');
var Web3 = require('web3');

$(function () {
  var web3 = new Web3(Web3.givenProvider || 'wss://mainnet.infura.io/ws');

  web3.eth.net.getPeerCount()
  .then(console.log);

  web3.eth.getBlockNumer()
  .then(console.log);

});