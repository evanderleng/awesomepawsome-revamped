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
                weight: '10.10',
                price: '10.99',
                description: 'This is a description',
                ingredients: 'Ingredient1, Ingredient2',
                petAge: 'Junior',
                petSize: 'Small'
            }
        };
    });

    it('should pass validation for valid inputs', async () => {
        await runMiddleware(req, checkAddProductReq);

        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(true);
    });

    //Brand Name Validation
    it('should fail validation when brand name is empty', async () => {
        req.body.brand = '';

        await runMiddleware(req, checkAddProductReq);

        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(false);
        expect(errors.array()[0].msg).toEqual('Brand must only contain alphanumeric characters and spaces and be below 1-50 characters');
    });

    it('should fail validation when brand name is not alphanumeric', async () => {
        req.body.brand = 'InvalidBrand@_/<script>test</script>';

        await runMiddleware(req, checkAddProductReq);

        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(false);
        expect(errors.array()[0].msg).toEqual('Brand must only contain alphanumeric characters and spaces and be below 1-50 characters');
    });

    //Product Validation
    it('should fail validation when product name is empty', async () => {
        req.body.name = '';

        await runMiddleware(req, checkAddProductReq);

        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(false);
        expect(errors.array()[0].msg).toEqual('Name must only contain alphanumeric characters and spaces and be below 1-50 characters');
    });

    it('should fail validation when product name is not alphanumeric', async () => {
        req.body.name = 'InvalidBrand@_/<script>test</script>';

        await runMiddleware(req, checkAddProductReq);

        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(false);
        expect(errors.array()[0].msg).toEqual('Name must only contain alphanumeric characters and spaces and be below 1-50 characters');
    });

    //Weight Validation
    it('should fail validation when weight is empty', async () => {
        req.body.weight = '';

        await runMiddleware(req, checkAddProductReq);

        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(false);
        expect(errors.array()[0].msg).toEqual('Weight is mandatory and must be at most 2dp');
    });

    it('should fail validation when weight is over 2 decimal point', async () => {
        req.body.weight = '10.000000000000000000001';

        await runMiddleware(req, checkAddProductReq);

        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(false);
        expect(errors.array()[0].msg).toEqual('Weight is mandatory and must be at most 2dp');
    });

    it('should fail validation when weight is invalid', async () => {
        req.body.weight = 'InvalidBrand@_/<script>test</script>';

        await runMiddleware(req, checkAddProductReq);

        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(false);
        expect(errors.array()[0].msg).toEqual('Weight is mandatory and must be at most 2dp');
    });

    //Price Validation
    it('should fail validation when price is empty', async () => {
        req.body.price = '';

        await runMiddleware(req, checkAddProductReq);

        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(false);
        expect(errors.array()[0].msg).toEqual('Not a valid price');
    });

    it('should fail validation when price is over 2 decimal point', async () => {
        req.body.price = '10.000000000000000000001';

        await runMiddleware(req, checkAddProductReq);

        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(false);
        expect(errors.array()[0].msg).toEqual('Weight is mandatory and must be at most 2dp');
    });

    it('should fail validation when price is invalid', async () => {
        req.body.price = 'invalidprice<script>test</script>';

        await runMiddleware(req, checkAddProductReq);

        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(false);
        expect(errors.array()[0].msg).toEqual('Not a valid price');
    });

    //Description Validation
    it('should fail validation when description is empty', async () => {
        req.body.description = '';

        await runMiddleware(req, checkAddProductReq);

        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(false);
        expect(errors.array()[0].msg).toEqual('Name must only contain alphanumeric characters, commas and spaces and be 1-50 characters');
    });

    it('should fail validation when description is invalid', async () => {
        req.body.description = 'InvalidBrand@_/<script>test</script>';

        await runMiddleware(req, checkAddProductReq);

        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(false);
        expect(errors.array()[0].msg).toEqual('Name must only contain alphanumeric characters, commas and spaces and be 1-50 characters');
    });

    //Ingridents Validation
    it('should fail validation when ingredients are empty', async () => {
        req.body.ingredients = '';

        await runMiddleware(req, checkAddProductReq);

        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(false);
        expect(errors.array()[0].msg).toEqual('Name must only contain alphanumeric characters, commas and spaces and be 1-50 characters');
    });

    it('should fail validation when ingredients are invalid', async () => {
        req.body.ingredients = 'InvalidBrand@_/<script>test</script>';

        await runMiddleware(req, checkAddProductReq);

        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(false);
        expect(errors.array()[0].msg).toEqual('Name must only contain alphanumeric characters, commas and spaces and be 1-50 characters');
    });

    //Pet Age Validation
    it('should fail validation when petAge is missing', async () => {
        req.body.petAge = '';

        await runMiddleware(req, checkAddProductReq);

        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(false);
        expect(errors.array()[0].msg).toEqual('Invalid Age');
    });

    it('should fail validation when petAge is invalid', async () => {
        req.body.petAge = '<script>invalid age</script>';

        await runMiddleware(req, checkAddProductReq);

        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(false);
        expect(errors.array()[0].msg).toEqual('Invalid Age');
    });
    
    //Pet Size Validation
    it('should fail validation when petSize is missing', async () => {
        req.body.petSize = '';

        await runMiddleware(req, checkAddProductReq);

        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(false);
        expect(errors.array()[0].msg).toEqual('Invalid Size');
    });

    it('should fail validation when petSize is invalid', async () => {
        req.body.petSize = '<script>invalid size</script>';

        await runMiddleware(req, checkAddProductReq);

        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(false);
        expect(errors.array()[0].msg).toEqual('Invalid Size');
    });
});
