// var SimpleStorage = artifacts.require("./SimpleStorage.sol");

// module.exports = function(deployer) {
//   deployer.deploy(SimpleStorage);
// };

var Hello = artifacts.require ("./Hello.sol");
module.exports = function (deployer) {
    deployer.deploy (Hello);
};