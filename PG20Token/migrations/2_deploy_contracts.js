var PG20TokenGenerator = artifacts.require("./PG20TokenGenerator.sol");

module.exports = function(deployer) {
	deployer.deploy(PG20TokenGenerator);
};
