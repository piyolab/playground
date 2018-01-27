var Playground20TokenGenerator = artifacts.require("Playground20TokenGenerator");
var Playground20Token = artifacts.require("Playground20Token");

function toEtherValue(weiValue) {
	return web3.fromWei(weiValue, 'ether').toNumber();
}

function toWeiValue(ethValue) {
	return web3.toWei(ethValue, 'ether');
}

contract('Playground20TokenGenerator', function(accounts) {

	before(function () {
		console.log("account1 ETH balance:", toEtherValue(web3.eth.getBalance(accounts[1])));
		buyer = accounts[1];
	});

	// すべてのテストの前に呼ばれます。
	beforeEach(async function () {
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

});