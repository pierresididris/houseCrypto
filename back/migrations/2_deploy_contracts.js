var Marketplace   = artifacts.require ("./Marketplace.sol");
// var Hello = artifacts.require ("./Hello.sol");
// const Migrations = artifacts.require("./Migrations");
module.exports = function (deployer) {
    // deployer.deploy(Migrations);
    // deployer.deploy (Hello);
    deployer.deploy (Marketplace);
};