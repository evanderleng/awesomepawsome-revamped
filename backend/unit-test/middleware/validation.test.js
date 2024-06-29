const { checkAddUserReq, checkLoginReq } = require('../../middleware/validators/userValidator');
const { validationResult } = require('express-validator');
const { check } = require('express-validator');

const mockRequest = (body = {}) => ({
  body
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const runMiddleware = async (req, res, middleware) => {
  for (let i = 0; i < middleware.length; i++) {
    const result = await middleware[i](req, res, () => null);
    if (result) {
      return result;
    }
  }
  return null;
};

describe('Validation Middleware', () => {
  test('should validate add user request successfully', async () => {
    const req = mockRequest({
      username: 'valid_username',
      password: 'Valid123!',
      email: 'user@example.com'
    });
    const res = mockResponse();

    await runMiddleware(req, res, checkAddUserReq);
    const errors = validationResult(req);

    expect(errors.isEmpty()).toBe(true);
  });

  test('should fail add user request with invalid username', async () => {
    const req = mockRequest({
      username: 'invalid username!',
      password: 'Valid123!',
      email: 'user@example.com'
    });
    const res = mockResponse();

    await runMiddleware(req, res, checkAddUserReq);
    const errors = validationResult(req);

    expect(errors.isEmpty()).toBe(false);
    expect(errors.array()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Username can only contain alphabets, digits and underscores"
        })
      ])
    );
  });

  test('should fail add user request with invalid password', async () => {
    const req = mockRequest({
      username: 'valid_username',
      password: 'invalid',
      email: 'user@example.com'
    });
    const res = mockResponse();

    await runMiddleware(req, res, checkAddUserReq);
    const errors = validationResult(req);

    expect(errors.isEmpty()).toBe(false);
    expect(errors.array()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Password must be at least 8 characters and contain one uppercase, lowercase, digit and symbol"
        })
      ])
    );
  });

  test('should validate login request successfully', async () => {
    const req = mockRequest({
      username: 'valid_username',
      password: 'Valid123!'
    });
    const res = mockResponse();

    await runMiddleware(req, res, checkLoginReq);
    const errors = validationResult(req);

    expect(errors.isEmpty()).toBe(true);
  });

  test('should fail login request with missing username', async () => {
    const req = mockRequest({
      password: 'Valid123!'
    });
    const res = mockResponse();

    await runMiddleware(req, res, checkLoginReq);
    const errors = validationResult(req);

    expect(errors.isEmpty()).toBe(false);
    expect(errors.array()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Username is required"
        })
      ])
    );
  });

  test('should fail login request with missing password', async () => {
    const req = mockRequest({
      username: 'valid_username'
    });
    const res = mockResponse();

    await runMiddleware(req, res, checkLoginReq);
    const errors = validationResult(req);

    expect(errors.isEmpty()).toBe(false);
    expect(errors.array()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Password is required"
        })
      ])
    );
  });
});