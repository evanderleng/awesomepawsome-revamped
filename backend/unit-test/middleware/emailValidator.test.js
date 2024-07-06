const { checkEmailReq } = require('../../middleware/validators/emailValidator');
const { validationResult } = require('express-validator');

describe('Email Validation Test', () => {
    const runMiddleware = async (req, middleware) => {
        await Promise.all(middleware.map(fn => fn(req, {}, () => {})));
    };

    let req;

    beforeEach(() => {
        req = { body: {} };
    });

    it('should pass validation for a valid email', async () => {
        req.body.email = 'validemail@example.com';

        await runMiddleware(req, checkEmailReq);

        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(true);
    });

    it('should fail validation for an empty email', async () => {
        req.body.email = '';

        await runMiddleware(req, checkEmailReq);

        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(false);
        expect(errors.array()[0].msg).toEqual("Email must be a valid email");
    });

    it('should fail validation for an invalid email format', async () => {
        req.body.email = 'invalidemail@';

        await runMiddleware(req, checkEmailReq);

        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(false);
        expect(errors.array()[0].msg).toEqual("Email must be a valid email");
    });

    it('should fail validation for a non-string email input', async () => {
        req.body.email = 12345;

        await runMiddleware(req, checkEmailReq);

        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(false);
        expect(errors.array()[0].msg).toEqual("Email must be a valid email");
    });
});
