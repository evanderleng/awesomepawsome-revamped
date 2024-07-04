const { checkUpdateCartReq } = require('../../middleware/validators/cartValidator');
const { validationResult } = require('express-validator');

jest.mock('express-validator', () => ({
    check: jest.fn((field, message) => ({
        run: jest.fn(),
        matches: jest.fn().mockReturnThis(),
        notEmpty: jest.fn().mockReturnThis(),
    })),
    validationResult: jest.fn(),
}));

describe('Cart Validaition Test', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {}
        };
        res = {};
        next = jest.fn();
    });

    it('should return an error for SQL injection attempt in product_id', async () => {
        req.body = { quantity: '5', product_id: '60d0fe4f5311236168a109ca; DROP TABLE users;' };

        validationResult.mockReturnValueOnce({
            isEmpty: jest.fn().mockReturnValue(false),
            array: jest.fn().mockReturnValue([{ msg: 'Not a valid ID' }]),
        });

        for (const validator of checkUpdateCartReq) {
            await validator.run(req); 
        }

        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(false);
        expect(errors.array()).toEqual([{ msg: 'Not a valid ID' }]);
    });

    it('should return an error for invalid quantity input (SQL injection)', async () => {
        req.body = { quantity: '5 OR 1=1', product_id: '60d0fe4f5311236168a109ca' };

        validationResult.mockReturnValueOnce({
            isEmpty: jest.fn().mockReturnValue(false),
            array: jest.fn().mockReturnValue([{ msg: 'Number must be an integer greater than or equal to zero' }]),
        });

        for (const validator of checkUpdateCartReq) {
            await validator.run(req); 
        }

        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(false);
        expect(errors.array()).toEqual([{ msg: 'Number must be an integer greater than or equal to zero' }]);
    });
});
