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

describe('the isEmpty function,', () => {
  it('should return true if no data is present', async () => {
    const mockSequelize = jest.spyOn(db.products, 'findAll');
    mockSequelize.mockResolvedValue([]);
    const res = await dbOperations.isEmpty();
    expect(mockSequelize).toHaveBeenCalled();
    expect(res).toBe(true);
    mockSequelize.mockRestore();
  });

  it('should return false if data is present', async () => {
    const mockSequelize = jest.spyOn(db.products, 'findAll');
    mockSequelize.mockResolvedValue([{ testField: 'test-data' }]);
    const res = await dbOperations.isEmpty();
    expect(mockSequelize).toHaveBeenCalled();
    expect(res).toBe(false);
    mockSequelize.mockRestore();
  });
});
