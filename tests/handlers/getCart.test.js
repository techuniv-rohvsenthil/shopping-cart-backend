const { getCart } = require('../../src/handlers/getCart');
const dbOperations = require('../../src/utils/dbOperations');

describe('the getCart handler function,', () => {
  it('should return all cart details from db', async () => {
    const mockRetrieve = jest.spyOn(dbOperations, 'retrieveCartDetailFromDB');
    mockRetrieve.mockResolvedValue();
    const res = await getCart();
    expect(mockRetrieve).toHaveBeenCalled();
    expect(res).toBe();
    mockRetrieve.mockRestore();
  });

  it('should return error message when retrieve fails', async () => {
    const mockRetrieve = jest.spyOn(dbOperations, 'retrieveCartDetailFromDB');
    mockRetrieve.mockRejectedValue(new Error('Failed to retrieve from DB'));
    const res = await getCart();
    expect(mockRetrieve).toHaveBeenCalled();
    expect(res).toBe('Failed to retrieve from DB');
    mockRetrieve.mockRestore();
  });
});
