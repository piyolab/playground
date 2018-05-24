<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script src="../web3/v0.20.6/web3.min.js"></script>
</head>
<body>

  <h1>Send ERC20 Token</h1>

  <h2>Notes</h2>
  <ul>
    <li>Use MetaMask</li>
    <li>To check ERC20 balance, use <a href="../getERC20TokenBalance/" target="_blank">getERC20TokenBalance</a></li>
  </ul>

  <h2>Token Address</h2>
  <input type="text" id="token-address" size="80" oninput="onAddressChange()"></input>
  <p>e.g. 0x2A65D41dbC6E8925bD9253abfAdaFab98eA53E34</p>

  <h2>Recipients Address</h2>
  <input type="text" id="to-address" size="80"></input>
  <p>e.g. 0x8Df70546681657D6FFE227aB51662e5b6e831B7A</p>

  <h2>Decimals</h2>
  <input type="number" id="decimals" size="40" readonly></input>

  <h2>Amount</h2>
  <input type="number" id="amount" size="40"></input>

  <div><button id="send" onclick="send()">Send ERC20 Token</button></div>

  <h2>Result</h2>
  <span id="result"></span>

  <script>

    function getERC20TokenBalance(tokenAddress, walletAddress, callback) {
      let minABI = [
        {"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"type":"function"},
        {"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"type":"function"}
      ];
      let contract = web3.eth.contract(minABI).at(tokenAddress);
      contract.balanceOf(walletAddress, (error, balance) => {
        contract.decimals((error, decimals) => {
          balance = balance.div(10**decimals);
          console.log(balance.toString());
          callback(balance);
        });
      });
    }

    function getERC20TokenContract(tokenAddress) {
      let minABI = [
        {"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"type":"function"},
        {"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"type":"function"},
        {"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"type":"function"}
      ];
      return web3.eth.contract(minABI).at(tokenAddress);
    }

    function getERC20TokenDecimals(callback) {
      window.tokenContract.decimals((error, decimals) => {
        callback(decimals);
      });
    }

    function onAddressChange(e) {
      let tokenAddress = document.getElementById('token-address').value;
      if(tokenAddress != "") {
        window.tokenContract = getERC20TokenContract(tokenAddress);
        getERC20TokenDecimals((decimals) => {
          document.getElementById('decimals').value = decimals;
        });
      }
    }

    function transferERC20Token(toAddress, value, callback) {
      window.tokenContract.transfer(toAddress, value, (error, txHash) => {
        callback(txHash);
      });
    }

    function send() {
      var toAddress = document.getElementById('to-address').value;
      var decimals = web3.toBigNumber(document.getElementById('decimals').value);
      var amount = web3.toBigNumber(document.getElementById('amount').value);
      var sendValue = amount.times(web3.toBigNumber(10).pow(18));
      console.log(sendValue.toString());
      transferERC20Token(toAddress, sendValue, (txHash) => {
        document.getElementById('result').innerText = txHash;
      });

        // example();
    }

    window.onload = function() {
      if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
      } else {
        web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io"));
      }
      console.log(web3.version.api);
    }

function example() {

  let tokenAddress = "0x2A65D41dbC6E8925bD9253abfAdaFab98eA53E34";
  let toAddress = "0x8Df70546681657D6FFE227aB51662e5b6e831B7A";

  // 数値は巨大な数値になっても扱えるように BigNumber に変換
  let decimals = web3.toBigNumber(18);
  let amount = web3.toBigNumber(100);

  let minABI = [
    // transfer
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "type": "function"
    }
  ];

  //  ABI とコントラクト（ERC20トークン）のアドレスから、コントラクトのインスタンスを取得 
  let contract = web3.eth.contract(minABI).at(tokenAddress);

  // 送付する ERC20 トークンの量を計算
  let value = amount.times(web3.toBigNumber(10).pow(decimals));

  // 引数にウォレットのアドレスと送付する ERC20 のトークン量を渡して、transfer 関数を呼ぶ
  contract.transfer(toAddress, value, (error, txHash) => {
    // トランザクションを実行するので、戻り値はトランザクションハッシュ   
    console.log(txHash);
  });

}

  </script>

</body>
</html>