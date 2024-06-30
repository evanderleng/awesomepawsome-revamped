const { checkAddReviewReq } = require('../../middleware/validators/reviewValidator');
const { validationResult } = require('express-validator');

describe('checkAddReviewReq middleware', () => {
  it('should validate comment length', () => {
    const req = { body: { comment: 'A valid comment within limits' } };
    const next = jest.fn();

    checkAddReviewReq[0].builder(req, {}, next);

    expect(validationResult(req).isEmpty()).toBe(true);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should reject invalid rating', () => {
    const req = { body: { rating: '6' } };
    const next = jest.fn();

    checkAddReviewReq[1].builder(req, {}, next);

    expect(validationResult(req).isEmpty()).toBe(false);
    expect(validationResult(req).array()[0].msg).toEqual('Rating must be between 1-5');
    expect(next).not.toHaveBeenCalled();
  });

  it('should reject invalid product_id', () => {
    const req = { body: { product_id: 'invalid_id' } };
    const next = jest.fn();

    checkAddReviewReq[2].builder(req, {}, next);

    expect(validationResult(req).isEmpty()).toBe(false);
    expect(validationResult(req).array()[0].msg).toEqual('Not a valid ID');
    expect(next).not.toHaveBeenCalled();
  });
});
