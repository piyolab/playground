var Playground20TokenGenerator = artifacts.require("Playground20TokenGenerator");
var Playground20Token = artifacts.require("Playground20Token");

function toEthValue(weiValue) {
	return web3.fromWei(weiValue, 'ether').toNumber();
}

function toWeiValue(ethValue) {
	return web3.toWei(ethValue, 'ether');
}

function getUnixtime() {
	return Math.floor( new Date() / 1000);
}

contract('Playground20TokenGenerator', function(accounts) {

	before(function () {
		buyer = accounts[1];
		console.log("0's ETH balance:", toEthValue(web3.eth.getBalance(accounts[0])));
		console.log("1's ETH balance:", toEthValue(web3.eth.getBalance(buyer)));
		console.log("2's ETH balance:", toEthValue(web3.eth.getBalance(accounts[2])));
		console.log("3's ETH balance:", toEthValue(web3.eth.getBalance(accounts[3])));
		console.log("4's ETH balance:", toEthValue(web3.eth.getBalance(accounts[4])));
		console.log("5's ETH balance:", toEthValue(web3.eth.getBalance(accounts[5])));
		console.log("6's ETH balance:", toEthValue(web3.eth.getBalance(accounts[6])));
	});

	// すべてのテストの前に呼ばれます。
	beforeEach(async function () {
	// before(async function () {
		generator = await Playground20TokenGenerator.new();
		token = await Playground20Token.at(await generator.token());
	});

	describe('トークン基本情報', async() => {

	    it('トークン名 == Playground20Token ', async function () {
			const expect = "Playground20Token";
			const actual = await token.name();
			// console.log("actual: " + actual);
			assert.equal(actual, expect);
 		});

	    it('トークンシンボル == PG20 ', async function () {
			const expect = "PG20";
			const actual = await token.symbol();
			// console.log("actual: " + actual);
			assert.equal(actual, expect);
 		});

	    it('トークンの小数点以下桁数 == 18', async function () {
			const expect = 18;
			const actual = await token.decimals();
			// console.log("actual: " + actual);
			assert.equal(actual, expect);
	    });

	    it('トークン初期供給量 == 0', async function () {
			const expect = 0;
			const actual = await token.totalSupply();
			// console.log("actual: " + actual);
			assert.equal(actual, expect);
	    });

	});

	describe('generator 基本情報', async() => {
		it('トークン/ETHのレート == 1000 ', async function () {
			const expect = 1000;
			const actual = await generator.rate();
			// console.log("actual: " + actual);
			assert.equal(actual, expect);
 		});

		it('トークンの cap == 21000000 ', async function () {
			const expect = 21000000;
			const cap = await generator.cap();
			const actual = toEthValue(cap);
			// console.log("actual: " + actual);
			assert.equal(actual, expect);
 		});

 		it('1ETH あたりのトークンのボーナス', async function () {
			const expect =  Math.floor((1577804400 - getUnixtime()) / 1000);
			const bonus = await generator.getBonus(toWeiValue(1));
			const actual = toEthValue(bonus);
			// console.log("actual: " + actual);
			assert.equal(actual, expect);
 		});

	});

	describe('トークン購入', async() => {

		it('1 ETH ぶんの購入', async function () {
			const ethAmount = 1;

			const rate = await generator.rate();
			const bonus = await generator.getBonus(toWeiValue(ethAmount));
			const expect = (rate * ethAmount) + toEthValue(bonus);
			// console.log("expect: " + expect);

			await generator.buyTokens(buyer, { from : buyer, value : toWeiValue(ethAmount) });
			const balance = await token.balanceOf(buyer);
			const actual = toEthValue(balance);
			// console.log("actual: " + actual);
			assert.equal(actual, expect);

			const totalSupply = await token.totalSupply();
			console.log(toEthValue(totalSupply));
 		});

 		it('3 ETH ぶんの購入', async function () {
			const ethAmount = 3;

			const rate = await generator.rate();
			const bonus = await generator.getBonus(toWeiValue(ethAmount));
			const expect = (rate * ethAmount) + toEthValue(bonus);
			// console.log("expect: " + expect);

			await generator.buyTokens(buyer, { from : buyer, value : toWeiValue(ethAmount) });
			const balance = await token.balanceOf(buyer);
			const actual = toEthValue(balance);
			// console.log("actual: " + actual);
			assert.equal(actual, expect);

			const totalSupply = await token.totalSupply();
			console.log(toEthValue(totalSupply));
 		});

 		it('0.2 ETH ぶんの購入', async function () {
			const ethAmount = 0.2;

			const rate = await generator.rate();
			const bonus = await generator.getBonus(toWeiValue(ethAmount));
			const expect = rate * ethAmount + toEthValue(bonus);
			// console.log("expect: " + expect);

			await generator.buyTokens(buyer, { from : buyer, value : toWeiValue(ethAmount) });
			const balance = await token.balanceOf(buyer);
			const actual = toEthValue(balance);
			// console.log("actual: " + actual);
			assert.equal(actual, expect);

			const totalSupply = await token.totalSupply();
			console.log(toEthValue(totalSupply));
 		});

 		// it('over cap 時の動作テスト', async function () {
			// const ethAmount = 50;

			// await generator.buyTokens(accounts[2], { from: accounts[2], value : toWeiValue(ethAmount) });
			// var totalSupply = await token.totalSupply();
			// console.log(toEthValue(totalSupply));
			// await generator.buyTokens(accounts[3], { from: accounts[3], value : toWeiValue(ethAmount) });
			// totalSupply = await token.totalSupply();
			// console.log(toEthValue(totalSupply));
			// await generator.buyTokens(accounts[4], { from: accounts[4], value : toWeiValue(ethAmount) });
			// totalSupply = await token.totalSupply();
			// console.log(toEthValue(totalSupply));
			// await generator.buyTokens(accounts[5], { from: accounts[5], value : toWeiValue(ethAmount) });
			// totalSupply = await token.totalSupply();
			// console.log(toEthValue(totalSupply));
			// await generator.buyTokens(accounts[6], { from: accounts[6], value : toWeiValue(ethAmount) });
			// totalSupply = await token.totalSupply();
			// console.log(toEthValue(totalSupply));
			// await generator.buyTokens(accounts[7], { from: accounts[7], value : toWeiValue(ethAmount) });
			// totalSupply = await token.totalSupply();
			// console.log(toEthValue(totalSupply));
			// await generator.buyTokens(accounts[8], { from: accounts[8], value : toWeiValue(ethAmount) });
			// totalSupply = await token.totalSupply();
			// console.log(toEthValue(totalSupply));
 		// });
		

	});


});