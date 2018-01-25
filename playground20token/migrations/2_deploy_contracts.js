var Playground20TokenGenerator = artifacts.require("./Playground20TokenGenerator.sol");

module.exports = function(deployer) {
	deployer.deploy(Playground20TokenGenerator);
};
