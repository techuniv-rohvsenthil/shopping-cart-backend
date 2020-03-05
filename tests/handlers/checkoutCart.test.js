const { checkoutCart } = require('../../src/handlers/checkoutCart');
const dbOperations = require('../../src/utils/dbOperations');

describe('the checkoutCart handler function,', () => {
  it('should return all cart details from db', async () => {
    const mockRemove = jest.spyOn(dbOperations, 'removeAllFromCart');
    mockRemove.mockResolvedValue();
    await checkoutCart();
    expect(mockRemove).toHaveBeenCalled();
    mockRemove.mockRestore();
  });

  it('should return error message when retrieve fails', async () => {
    const mockRemove = jest.spyOn(dbOperations, 'removeAllFromCart');
    mockRemove.mockRejectedValue(new Error('Failed to remove from DB'));
    const res = await checkoutCart();
    expect(mockRemove).toHaveBeenCalled();
    expect(res).toBe('Failed to remove from DB');
    mockRemove.mockRestore();
  });
});
