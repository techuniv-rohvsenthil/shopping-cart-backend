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
      await dbOperations.insertCartDetailsToDB();
      expect(mockSequelize).toHaveBeenCalledWith(mockValues);
      mockSequelize.mockRestore();
    });
  });
});
