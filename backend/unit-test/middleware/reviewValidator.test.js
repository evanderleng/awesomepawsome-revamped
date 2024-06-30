const { checkAddReviewReq } = require('../../middleware/validators/reviewValidator');
const { validationResult } = require('express-validator');

describe('checkAddReviewReq middleware', () => {
  it('should validate comment length', async () => {
    const req = { body: { 
      comment: 'A valid comment within limits', 
      rating: '3',
      product_id: '507f1f77bcf86cd799439011'
    } };
    const next = jest.fn();

    await Promise.all(checkAddReviewReq.map(validator => validator.run(req)));

    const result = validationResult(req);
    expect(result.isEmpty()).toBe(true);
    expect(next).toHaveBeenCalledTimes(0); // next won't be called because validators don't call next
  });

  it('should reject invalid rating', async () => {
    const req = { body: { 
      comment: 'A valid comment within limits', 
      rating: '6',
      product_id: '507f1f77bcf86cd799439011'
    } };
    const next = jest.fn();

    await Promise.all(checkAddReviewReq.map(validator => validator.run(req)));

    const result = validationResult(req);
    expect(result.isEmpty()).toBe(false);
    expect(result.array()[0].msg).toEqual('Rating must be between 1-5');
    expect(next).toHaveBeenCalledTimes(0); // next won't be called because validators don't call next
  });

  it('should reject invalid product_id', async () => {
    const req = { body: { 
      comment: 'A valid comment within limits', 
      rating: '3',
      product_id: 'invalid_id' 
    } };
    const next = jest.fn();

    await Promise.all(checkAddReviewReq.map(validator => validator.run(req)));

    const result = validationResult(req);
    expect(result.isEmpty()).toBe(false);
    expect(result.array()[0].msg).toEqual('Not a valid ID');
    expect(next).toHaveBeenCalledTimes(0); // next won't be called because validators don't call next
  });
});
