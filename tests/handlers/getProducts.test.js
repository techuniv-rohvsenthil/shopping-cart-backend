const axios = require('axios');
const { getProducts } = require('../../src/handlers/getProducts');
const dbOperations = require('../../src/utils/dbOperations');

describe('the getProducts handler function,', () => {
  it('should call insertProductDetailsToDB and retrieveProductDetailsFromDB', async () => {
    const mockAxios = jest.spyOn(axios, 'get');
    mockAxios.mockResolvedValue({
      data: [{
        dataField: 'dataValue',
      }],
    });
    const mockStoreToDB = jest.spyOn(dbOperations, 'insertProductDetailsToDB');
    const mockRetrieve = jest.spyOn(dbOperations, 'retrieveProductDetailsFromDB');
    mockRetrieve.mockResolvedValue([]);
    mockStoreToDB.mockResolvedValue();
    await getProducts();
    expect(mockStoreToDB).toHaveBeenCalled();
    expect(mockRetrieve).toHaveBeenCalled();
    expect(mockAxios).toHaveBeenCalled();
    mockStoreToDB.mockRestore();
    mockRetrieve.mockRestore();
    mockAxios.mockRestore();
  });

  it('should return error message when store fails', async () => {
    const mockAxios = jest.spyOn(axios, 'get');
    mockAxios.mockResolvedValue({
      data: [{
        dataField: 'dataValue',
      }],
    });
    const mockStoreToDB = jest.spyOn(dbOperations, 'insertProductDetailsToDB');
    const mockRetrieve = jest.spyOn(dbOperations, 'retrieveProductDetailsFromDB');
    mockRetrieve.mockResolvedValue([]);
    mockStoreToDB.mockRejectedValue(new Error('Failed to store to DB'));
    const res = await getProducts();
    expect(mockAxios).toHaveBeenCalled();
    expect(mockRetrieve).toHaveBeenCalled();
    expect(res).toBe('Failed to store to DB');
    mockStoreToDB.mockRestore();
    mockRetrieve.mockRestore();
    mockAxios.mockRestore();
  });

  it('should return error message when retrieve fails', async () => {
    const mockAxios = jest.spyOn(axios, 'get');
    mockAxios.mockResolvedValue({
      data: [{
        dataField: 'dataValue',
      }],
    });
    const mockRetrieve = jest.spyOn(dbOperations, 'retrieveProductDetailsFromDB');
    mockRetrieve.mockRejectedValue(new Error('Failed to retrieve from DB'));
    const res = await getProducts();
    expect(mockRetrieve).toHaveBeenCalled();
    expect(res).toBe('Failed to retrieve from DB');
    mockRetrieve.mockRestore();
    mockAxios.mockRestore();
  });

  it('should return retrieved data is DB is not empty', async () => {
    const mockRetrieve = jest.spyOn(dbOperations, 'retrieveProductDetailsFromDB');
    mockRetrieve.mockResolvedValue([{ dataField: 'test-data' }]);
    const res = await getProducts();
    expect(res).toStrictEqual([{ dataField: 'test-data' }]);
    mockRetrieve.mockRestore();
  });
});
