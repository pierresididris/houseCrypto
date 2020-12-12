// var SimpleStorage = artifacts.require("./SimpleStorage.sol");

// module.exports = function(deployer) {
//   deployer.deploy(SimpleStorage);
// };
// var RealEstateFactory = artifacts.require ("./RealEstateFactory.sol");
var Hello = artifacts.require ("./Hello.sol");
// const Migrations = artifacts.require("./Migrations");
module.exports = function (deployer) {
    // deployer.deploy(Migrations);
    deployer.deploy (Hello);
};