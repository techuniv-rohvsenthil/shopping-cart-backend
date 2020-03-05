const { checkoutCart } = require('../../src/handlers/checkoutCart');
const dbOperations = require('../../src/utils/dbOperations');

describe('the checkoutCart handler function,', () => {
  it('should return all cart details from db', async () => {
    const mockRemove = jest.spyOn(dbOperations, 'removeAllFromCart');
    const mockRetrieve = jest.spyOn(dbOperations, 'retrieveCartDetailFromDB');
    const mockUpdate = jest.spyOn(dbOperations, 'updateProductDetails');
    mockRemove.mockResolvedValue();
    mockUpdate.mockResolvedValue();
    mockRetrieve.mockResolvedValue([
      {
        id: 11,
        item: 'Pomegranate - 1kg',
        quantity: 1,
        price: '149',
        createdAt: '2020-03-05T20:17:22.162Z',
        updatedAt: '2020-03-05T20:17:22.162Z',
      },
      {
        id: 12,
        item: 'Pomegranate - 1kg',
        quantity: 1,
        price: '149',
        createdAt: '2020-03-05T20:17:22.350Z',
        updatedAt: '2020-03-05T20:17:22.350Z',
      },
    ]);
    await checkoutCart();
    expect(mockRetrieve).toHaveBeenCalled();
    expect(mockRemove).toHaveBeenCalled();
    expect(mockUpdate).toHaveBeenCalled();
    mockRemove.mockRestore();
    mockUpdate.mockRestore();
    mockRetrieve.mockRestore();
  });

  it('should return error message when retrieve fails', async () => {
    const mockRetrieve = jest.spyOn(dbOperations, 'retrieveCartDetailFromDB');
    mockRetrieve.mockRejectedValue(new Error('Failed to retrieve from DB'));
    const res = await checkoutCart();
    expect(mockRetrieve).toHaveBeenCalled();
    expect(res).toBe('Failed to retrieve from DB');
    mockRetrieve.mockRestore();
  });

  it('should return error message when remove fails', async () => {
    const mockRemove = jest.spyOn(dbOperations, 'removeAllFromCart');
    const mockRetrieve = jest.spyOn(dbOperations, 'retrieveCartDetailFromDB');
    mockRetrieve.mockResolvedValue();
    mockRemove.mockRejectedValue(new Error('Failed to remove from DB'));
    const res = await checkoutCart();
    expect(mockRemove).toHaveBeenCalled();
    expect(res).toBe('Failed to remove from DB');
    mockRemove.mockRestore();
  });

  it('should return error message when update fails', async () => {
    const mockRemove = jest.spyOn(dbOperations, 'removeAllFromCart');
    const mockRetrieve = jest.spyOn(dbOperations, 'retrieveCartDetailFromDB');
    const mockUpdate = jest.spyOn(dbOperations, 'updateProductDetails');
    mockRemove.mockResolvedValue();
    mockRetrieve.mockResolvedValue([
      {
        id: 11,
        item: 'Pomegranate - 1kg',
        quantity: 1,
        price: '149',
        createdAt: '2020-03-05T20:17:22.162Z',
        updatedAt: '2020-03-05T20:17:22.162Z',
      },
      {
        id: 12,
        item: 'Pomegranate - 1kg',
        quantity: 1,
        price: '149',
        createdAt: '2020-03-05T20:17:22.350Z',
        updatedAt: '2020-03-05T20:17:22.350Z',
      },
    ]);
    mockUpdate.mockRejectedValue(new Error('Failed to update from DB'));
    const res = await checkoutCart();
    expect(mockRemove).toHaveBeenCalled();
    expect(mockRetrieve).toHaveBeenCalled();
    expect(res).toBe('Failed to update from DB');
    mockRemove.mockRestore();
  });
});
