var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = process.env.MNEMONIC;
var infuraAccessToken = process.env.INFURA_ACCESS_TOKEN;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    // Local geth 用デプロイ設定
    local: {
      network_id: 8888,
      host: "localhost",
      port: 8888,
      gas: 4000000,
      gasPrice: 10000000000 // 10 Gwei
    },
    // Ropsten テストネット用デプロイ設定
  	ropsten: {
  		provider: function() {
        	return new HDWalletProvider(
        		mnemonic,
          		"https://ropsten.infura.io/" + infuraAccessToken
        	);
      },
      network_id: 3,
    	gas: 4000000,
    	gasPrice: 10000000000	// 10 Gwei
  	},
    // メインネット用デプロイ設定
    mainnet: {
      provider: function() {
          return new HDWalletProvider(
            mnemonic,
            "https://mainnet.infura.io/" + infuraAccessToken
          );
      },
      network_id: 1,
      gas: 4000000,
      gasPrice: 5000000000 // 5 Gwei
    }
  }
};
