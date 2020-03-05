const dbOperations = require('../../src/utils/dbOperations');
const db = require('../../models/index');


describe('the insertProductDetailsToDB function,', () => {
  it('should insert the metadata details of the product', async () => {
    const mockValues = {
      id: 1,
      name: 'test-name',
      price: 20,
      quantity: 10,
      imageLink: 'test-image',
      category: 'test-category',
    };
    const mockSequelize = jest.spyOn(db.products, 'create');
    mockSequelize.mockResolvedValue();
    await dbOperations.insertProductDetailsToDB(mockValues);
    expect(mockSequelize).toHaveBeenCalledWith({
      prodId: 1,
      prodName: 'test-name',
      prodPrice: 20,
      prodQuantity: 10,
      prodImage: 'test-image',
      prodCategory: 'test-category',
    });
    mockSequelize.mockRestore();
  });
});

describe('the retrieveProductDetailsFromDB function,', () => {
  it('should return the data in db', async () => {
    const mockSequelize = jest.spyOn(db.products, 'findAll');
    mockSequelize.mockResolvedValue();
    await dbOperations.retrieveProductDetailsFromDB();
    expect(mockSequelize).toHaveBeenCalled();
    mockSequelize.mockRestore();
  });

  describe('the insertCartDetailsToDB function,', () => {
    const mockValues = {
      item: 'test-item',
      price: 20,
      quantity: 1,
    };
    it('should insert cart details to db', async () => {
      const mockSequelize = jest.spyOn(db.carts, 'create');
      mockSequelize.mockResolvedValue();
      await dbOperations.insertCartDetailsToDB(mockValues);
      expect(mockSequelize).toHaveBeenCalledWith(mockValues);
      mockSequelize.mockRestore();
    });
  });

  describe('the removeCartDetailFromDB function,', () => {
    const itemName = 'test-item';
    it('should insert cart details to db', async () => {
      const mockSequelize = jest.spyOn(db.carts, 'findOne');
      mockSequelize.mockResolvedValue(1);
      const mockSequelizeDestroy = jest.spyOn(db.carts, 'destroy');
      mockSequelizeDestroy.mockResolvedValue();
      await dbOperations.removeCartDetailFromDB(itemName);
      expect(mockSequelize).toHaveBeenCalled();
      expect(mockSequelizeDestroy).toHaveBeenCalled();
      mockSequelize.mockRestore();
      mockSequelizeDestroy.mockRestore();
    });
  });

  describe('the retrieveCartDetailFromDB function,', () => {
    it('should return the data in db', async () => {
      const mockSequelize = jest.spyOn(db.carts, 'findAll');
      mockSequelize.mockResolvedValue();
      await dbOperations.retrieveCartDetailFromDB();
      expect(mockSequelize).toHaveBeenCalled();
      mockSequelize.mockRestore();
    });
  });

  describe('the updateProductDetails function,', () => {
    it('should update the data (quantity) in db', async () => {
      const mockValues = { item: 'test-item', newQuantity: 20 };
      const mockSequelize = jest.spyOn(db.products, 'update');
      mockSequelize.mockResolvedValue();
      await dbOperations.updateProductDetails(mockValues.item, mockValues.newQuantity);
      expect(mockSequelize).toHaveBeenCalledWith({ prodQuantity: 20 }, { where: { prodName: 'test-item' } });
      mockSequelize.mockRestore();
    });
  });
});
