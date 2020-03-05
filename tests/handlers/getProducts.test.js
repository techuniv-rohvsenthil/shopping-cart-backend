const axios = require('axios');
const getProducts = require('../../src/handlers/getProducts');
const dbOperations = require('../../src/utils/dbOperations');

describe('the getProducts handler function,', () => {
  it('should call insertProductDetailsToDB', async () => {
    const mockAxios = jest.spyOn(axios, 'get');
    mockAxios.mockResolvedValue({
      data: [{
        dataField: 'dataValue',
      }],
    });
    const mockStoreToDB = jest.spyOn(dbOperations, 'insertProductDetailsToDB');
    mockStoreToDB.mockResolvedValue();
    const res = await getProducts();
    expect(mockStoreToDB).toHaveBeenCalled();
    expect(mockAxios).toHaveBeenCalled();
    expect(res).toBe('Successfully stored data!');
    mockStoreToDB.mockRestore();
    mockAxios.mockRestore();
  });

  it('should return error message when retrieve fails', async () => {
    const mockAxios = jest.spyOn(axios, 'get');
    mockAxios.mockResolvedValue({
      data: [{
        dataField: 'dataValue',
      }],
    });
    const mockStoreToDB = jest.spyOn(dbOperations, 'insertProductDetailsToDB');
    mockStoreToDB.mockRejectedValue(new Error('Failed to store to DB'));
    const res = await getProducts();
    expect(mockAxios).toHaveBeenCalled();
    expect(res).toBe('Failed to store to DB');
    mockStoreToDB.mockRestore();
    mockAxios.mockRestore();
  });
});
