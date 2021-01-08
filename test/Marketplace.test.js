const Marketplace = artifacts.require('./Marketplace.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Marketplace', ([deployer, seller, buyer]) => {
  let marketplace

  before(async () => {
    marketplace = await Marketplace.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await marketplace.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await marketplace.name()
      assert.equal(name, 'Marketplace')
    })
  })

  describe('products', async () => {
    let result, productCount

    before(async () => {
      result = await marketplace.createRealEstate(
        'Flat', 
        web3.utils.toWei('1', 'Ether'), 
        '75 rue saint jacques',
        42,
        'Petit appartement en bord de mer',
        2,
        '07/01/2021',
        { from: seller }
        )
      productCount = await marketplace.productCount()
    })

    it('creates products', async () => {
      // SUCCESS
      assert.equal(productCount, 1) 
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
      assert.equal(event.name, 'Flat', 'name is correct')
      assert.equal(event.price, '1000000000000000000', 'price is correct')
      assert.equal(event.realEstateAddress, '75 rue saint jacques', 'address is correct')
      assert.equal(event.area, 42, 'area is correct')
      assert.equal(event.description, 'Petit appartement en bord de mer', 'description is correct')
      assert.equal(event.nbroom, 2, 'nbroom is correct')
      assert.equal(event.sellingDate, '07/01/2021', 'selling date is correct')
      assert.equal(event.owner, seller, 'owner is correct')
      assert.equal(event.purchased, false, 'purchased is correct')

      // FAILURE: RealEstate must have a name
      await await marketplace.createRealEstate('', web3.utils.toWei('1', 'Ether'), '75 rue saint jacques', 42, 'Petit appartement en bord de mer', 2, '07/01/2021', { from: seller }).should.be.rejected;
      // FAILURE: RealEstate must have a price
      await await marketplace.createRealEstate('Flat', 0, '75 rue saint jacques', 42, 'Petit appartement en bord de mer', 2, '07/01/2021', { from: seller }).should.be.rejected;
      // FAILURE: RealEstate must have an address
      await await marketplace.createRealEstate('Flat', web3.utils.toWei('1', 'Ether'), '', 42,'Petit appartement en bord de mer', 2, '07/01/2021', { from: seller }).should.be.rejected;
      // // FAILURE: RealEstate must have an area
      await await marketplace.createRealEstate('Flat', web3.utils.toWei('1', 'Ether'), '75 rue saint jacques', 0, 'Petit appartement en bord de mer', 2, '07/01/2021', { from: seller }).should.be.rejected;
      // // FAILURE: RealEstate must have a description
      await await marketplace.createRealEstate('Flat', web3.utils.toWei('1', 'Ether'), '75 rue saint jacques', 42, '', 2, '07/01/2021', { from: seller }).should.be.rejected;
      // // FAILURE: RealEstate must have a nb of room
      await await marketplace.createRealEstate('Flat', web3.utils.toWei('1', 'Ether'), { from: seller }, '75 rue saint jacques', 42, 'Petit appartement en bord de mer', 0, '07/01/2021', { from: seller }).should.be.rejected;
      // // FAILURE: RealEstate must have a nb of sellingDate
      await await marketplace.createRealEstate('Flat', web3.utils.toWei('1', 'Ether'), { from: seller }, '75 rue saint jacques', 42, 'Petit appartement en bord de mer', 0, '', { from: seller }).should.be.rejected;
      
    })

 

    it('sells products', async () => {
      // Track the seller balance before purchase
      let oldSellerBalance
      oldSellerBalance = await web3.eth.getBalance(seller)
      oldSellerBalance = new web3.utils.BN(oldSellerBalance)

      // SUCCESS: Buyer makes purchase
      result = await marketplace.purchaseRealEstate(productCount, { from: buyer, value: web3.utils.toWei('1', 'Ether')})

      // Check logs
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
      assert.equal(event.name, 'Flat', 'name is correct')
      assert.equal(event.price, '1000000000000000000', 'price is correct')
      assert.equal(event.realEstateAddress, '75 rue saint jacques', 'address is correct')
      assert.equal(event.area, 42, 'area is correct')
      assert.equal(event.description, 'Petit appartement en bord de mer', 'description is correct')
      assert.equal(event.nbroom, 2, 'nbroom is correct')
      assert.equal(event.sellingDate, '07/01/2021', 'selling date is correct')
      assert.equal(event.owner, buyer, 'owner is correct')
      assert.equal(event.purchased, true, 'purchased is correct')

      // Check that seller received funds
      let newSellerBalance
      newSellerBalance = await web3.eth.getBalance(seller)
      newSellerBalance = new web3.utils.BN(newSellerBalance)

      let price
      price = web3.utils.toWei('1', 'Ether')
      price = new web3.utils.BN(price)

      const exepectedBalance = oldSellerBalance.add(price)

      assert.equal(newSellerBalance.toString(), exepectedBalance.toString())

      // FAILURE: Tries to buy a product that does not exist, i.e., product must have valid id
      await marketplace.purchaseRealEstate(99, { from: buyer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;      // FAILURE: Buyer tries to buy without enough ether
      // FAILURE: Buyer tries to buy without enough ether
      await marketplace.purchaseRealEstate(productCount, { from: buyer, value: web3.utils.toWei('0.5', 'Ether') }).should.be.rejected;
      // FAILURE: Deployer tries to buy the product, i.e., product can't be purchased twice
      await marketplace.purchaseRealEstate(productCount, { from: deployer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
      // FAILURE: Buyer tries to buy again, i.e., buyer can't be the seller
      await marketplace.purchaseRealEstate(productCount, { from: buyer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
    })

  })
})