const { checkAddReviewReq } = require('../../middleware/validators/reviewValidator');
const { validationResult } = require('express-validator');

describe('Review validation test', () => {
  const runMiddleware = (req, res, middleware) => {
    return new Promise((resolve) => {
      middleware(req, res, resolve);
    });
  };

  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = {};
    next = jest.fn();
  });

  it('should validate a correct review input', async () => {
    req.body = {
      comment: 'A valid comment within limits',
      rating: '3',
      product_id: '507f1f77bcf86cd799439011'
    };

    await Promise.all(checkAddReviewReq.map(validator => validator.run(req)));

    const result = validationResult(req);
    expect(result.isEmpty()).toBe(true);
    expect(next).toHaveBeenCalledTimes(0);
  });

  it('should reject invalid rating', async () => {
    req.body = {
      comment: 'A valid comment within limits',
      rating: '6',
      product_id: '507f1f77bcf86cd799439011'
    };

    await Promise.all(checkAddReviewReq.map(validator => validator.run(req)));

    const result = validationResult(req);
    expect(result.isEmpty()).toBe(false);
    expect(result.array()[0].msg).toEqual('Rating must be between 1-5');
    expect(next).toHaveBeenCalledTimes(0);
  });

  it('should reject invalid product_id', async () => {
    req.body = {
      comment: 'A valid comment within limits',
      rating: '3',
      product_id: 'invalid_id'
    };

    await Promise.all(checkAddReviewReq.map(validator => validator.run(req)));

    const result = validationResult(req);
    expect(result.isEmpty()).toBe(false);
    expect(result.array()[0].msg).toEqual('Not a valid ID');
    expect(next).toHaveBeenCalledTimes(0);
  });

  it('should reject SQL injection attempt in product_id', async () => {
    req.body = {
      comment: 'A valid comment within limits',
      rating: '3',
      product_id: '507f1f77bcf86cd799439011; DROP TABLE users;'
    };

    await Promise.all(checkAddReviewReq.map(validator => validator.run(req)));

    const result = validationResult(req);
    expect(result.isEmpty()).toBe(false);
    expect(result.array()[0].msg).toEqual('Not a valid ID');
    expect(next).toHaveBeenCalledTimes(0);
  });

  it('should reject SQL injection attempt in rating', async () => {
    req.body = {
      comment: 'A valid comment within limits',
      rating: '5 OR 1=1',
      product_id: '507f1f77bcf86cd799439011'
    };

    await Promise.all(checkAddReviewReq.map(validator => validator.run(req)));

    const result = validationResult(req);
    expect(result.isEmpty()).toBe(false);
    expect(result.array()[0].msg).toEqual('Rating must be between 1-5');
    expect(next).toHaveBeenCalledTimes(0);
  });
});
