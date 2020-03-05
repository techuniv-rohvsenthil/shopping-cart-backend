const { updateCart } = require('../../src/handlers/updateCart');
const dbOperations = require('../../src/utils/dbOperations');

describe('the updateCart handler function,', () => {
  it('should call insertCartDetailsToDB when action is store', async () => {
    const mockRequest = {
      payload: {
        cartObj: {
          item: 'apple',
          price: 20,
          quantity: 1,
        },
        action: 'store',
      },
    };

    const mockCode = jest.fn();
    const mockH = {
      response:
        jest.fn(() => (
          {
            code: mockCode,
          })),
    };
    const mockStoreToDB = jest.spyOn(dbOperations, 'insertCartDetailsToDB');
    mockStoreToDB.mockResolvedValue();
    await updateCart(mockRequest, mockH);
    expect(mockStoreToDB).toHaveBeenCalledWith(mockRequest.payload.cartObj);
    mockStoreToDB.mockRestore();
  });

  it('should call removeCartDetailFromDB when action is retrieve', async () => {
    const mockRequest = {
      payload: {
        cartObj: {
          item: 'apple',
          price: 20,
          quantity: 1,
        },
        action: 'retrieve',
      },
    };

    const mockCode = jest.fn();
    const mockH = {
      response:
        jest.fn(() => (
          {
            code: mockCode,
          })),
    };
    const mockRetrieve = jest.spyOn(dbOperations, 'removeCartDetailFromDB');
    mockRetrieve.mockResolvedValue();
    await updateCart(mockRequest, mockH);
    expect(mockRetrieve).toHaveBeenCalledWith(mockRequest.payload.cartObj.item);
    mockRetrieve.mockRestore();
  });

  it('should return error message when store fails', async () => {
    const mockRequest = {
      payload: {
        cartObj: {
          item: 'apple',
          price: 20,
          quantity: 1,
        },
        action: 'store',
      },
    };

    const mockCode = jest.fn();
    const mockH = {
      response:
      jest.fn(() => (
        {
          code: mockCode,
        })),
    };
    const mockStoreToDB = jest.spyOn(dbOperations, 'insertCartDetailsToDB');
    mockStoreToDB.mockRejectedValue(new Error('Failed to store to DB'));
    await updateCart(mockRequest, mockH);
    expect(mockH.response).toHaveBeenCalledWith('Failed to store to DB');
    mockStoreToDB.mockRestore();
  });

  it('should return error message when delete fails', async () => {
    const mockRequest = {
      payload: {
        cartObj: {
          item: 'apple',
          price: 20,
          quantity: 1,
        },
        action: 'retrieve',
      },
    };

    const mockCode = jest.fn();
    const mockH = {
      response:
        jest.fn(() => (
          {
            code: mockCode,
          })),
    };
    const mockRetrieve = jest.spyOn(dbOperations, 'removeCartDetailFromDB');
    mockRetrieve.mockRejectedValue(new Error('Failed to retrieve from DB'));
    await updateCart(mockRequest, mockH);
    expect(mockH.response).toHaveBeenCalledWith('Failed to retrieve from DB');
    mockRetrieve.mockRestore();
  });
});
