const { checkAddProductReq } = require('../../middleware/validators/productValidator');
const { validationResult } = require('express-validator');

describe('Product validation test', () => {
    const runMiddleware = async (req, middleware) => {
        await Promise.all(middleware.map(fn => fn(req, {}, () => {})));
    };

    let req;

    beforeEach(() => {
        req = {
            body: {
                brand: 'TestBrand',
                name: 'TestProduct',
                price: '10.99',
                ingredients: 'Ingredient1, Ingredient2',
                breedSize: 'Small'
            }
        };
    });

    it('should pass validation for valid inputs', async () => {
        await runMiddleware(req, checkAddProductReq);

        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(true);
    });

    it('should fail validation when brand is missing', async () => {
        delete req.body.brand;

        await runMiddleware(req, checkAddProductReq);

        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(false);
        expect(errors.array()[0].msg).toEqual('Invalid value');
    });

    it('should fail validation when price is invalid', async () => {
        req.body.price = 'invalidprice';

        await runMiddleware(req, checkAddProductReq);

        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(false);
        expect(errors.array()[0].msg).toEqual('Not a valid price');
    });

    it('should fail validation when ingredients are empty', async () => {
        req.body.ingredients = '';

        await runMiddleware(req, checkAddProductReq);

        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(false);
        expect(errors.array()[0].msg).toEqual('Invalid value');
    });

    it('should fail validation when breedSize is missing', async () => {
        delete req.body.breedSize;

        await runMiddleware(req, checkAddProductReq);

        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(false);
        expect(errors.array()[0].msg).toEqual('Invalid value');
    });
});
