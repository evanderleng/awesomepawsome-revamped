const jwt = require('jsonwebtoken');
const { auth, authAdmin } = require('../../middleware/authMiddleware');
const User = require('../../models/User');

describe('Authentication Validation Test', () => {
    let req, res, next;

    beforeEach(() => {
        process.env.TOKEN_SECRET = 'mysecret';
        req = {
            headers: {
                authorization: 'Bearer ' + jwt.sign({ userId: 'user123' }, process.env.TOKEN_SECRET)
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    it('Should authenticate valid token', async () => {
        await auth(req, res, next);

        expect(req.user).toBeDefined();
        expect(req.user.userId).toEqual('user123');
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    it('Should return 401 for missing token', async () => {
        delete req.headers.authorization;

        await auth(req, res, next);

        expect(req.user).toBeUndefined();
        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorised' });
    });

    it('Should return 401 for invalid token', async () => {
        req.headers.authorization = 'Bearer invalidtoken';

        await auth(req, res, next);

        expect(req.user).toBeUndefined();
        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorised' });
    });
});

describe('Admin Authentication Validation Test', () => {
    let req, res, next;

    beforeEach(() => {
        process.env.TOKEN_SECRET = 'myadminsecret';
        req = {
            headers: {
                authorization: 'Bearer ' + jwt.sign({ userId: 'admin123' }, process.env.TOKEN_SECRET)
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    it('Should authorize admin user', async () => {
        const mockUser = {
            _id: 'admin123',
            admin: true
        };
        jest.spyOn(User, 'findOne').mockResolvedValue(mockUser);

        await authAdmin(req, res, next);

        expect(req.user).toBeDefined();
        expect(req.user.userId).toEqual('admin123');
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    it('Should return 401 for non-admin user', async () => {
        const mockUser = {
            _id: 'user123',
            admin: false
        };
        jest.spyOn(User, 'findOne').mockResolvedValue(mockUser);

        await authAdmin(req, res, next);

        expect(req.user).toBeUndefined();
        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorised' });
    });

    it('Should return 401 for invalid token', async () => {
        req.headers.authorization = 'Bearer invalidtoken';

        await authAdmin(req, res, next);

        expect(req.user).toBeUndefined();
        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorised' });
    });
});
