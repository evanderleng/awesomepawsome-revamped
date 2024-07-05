const {
  checkAddUserReq,
  checkLoginReq,
  checkEditProfileReq,
  checkEditPetReq
} = require('../../middleware/validators/userValidator');
const { validationResult } = require('express-validator');

describe('Validation Security Test', () => {
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

  describe('Add User Validation', () => {
    it('should validate correct inputs', async () => { 
      req.body = {
        username: 'valid_username',
        password: 'ValidPassword1!',
        email: 'validemail@example.com'
      };

      await Promise.all(checkAddUserReq.map(validation => validation.run(req)));

      const errors = validationResult(req);
      expect(errors.isEmpty()).toBe(true);
    });

    it('should fail validation for SQL injection attempt in username', async () => { 
      req.body = {
        username: '1; DROP TABLE users;',
        password: 'ValidPassword1!',
        email: 'validemail@example.com'
      };

      await Promise.all(checkAddUserReq.map(validation => validation.run(req)));

      const errors = validationResult(req);
      expect(errors.isEmpty()).toBe(false);
      expect(errors.array()[0].msg).toEqual("Username can only contain alphabets, digits and underscores and have a maximum of 20 characters");
    });
  });

  describe('Login Validation', () => {
    it('should validate correct inputs', async () => {
      req.body = {
        username: 'valid_username',
        password: 'ValidPassword1!'
      };

      await Promise.all(checkLoginReq.map(validation => validation.run(req)));

      const errors = validationResult(req);
      expect(errors.isEmpty()).toBe(true);
    });

    it('should fail validation for SQL injection attempt in username', async () => {
      req.body = {
        username: 'valid_username; DROP TABLE users;',
        password: 'ValidPassword1!'
      };

      await Promise.all(checkLoginReq.map(validation => validation.run(req)));

      const errors = validationResult(req);
      expect(errors.isEmpty()).toBe(false);
      expect(errors.array()[0].msg).toEqual("Username is required");
    });
  });

  describe('Edit Profile Validation', () => {
    it('should validate correct inputs', async () => {
      req.body = {
        username: 'valid_username',
        email: 'validemail@example.com',
        address: 'Valid Address'
      };

      await Promise.all(checkEditProfileReq.map(validation => validation.run(req)));

      const errors = validationResult(req);
      expect(errors.isEmpty()).toBe(true);
    });

    it('should fail validation for SQL injection attempt in username', async () => {
      req.body = {
        username: 'user; DROP TABLE users;',
        email: 'validemail@example.com',
        address: 'Valid Address'
      };

      await Promise.all(checkEditProfileReq.map(validation => validation.run(req)));

      const errors = validationResult(req);
      expect(errors.isEmpty()).toBe(false);
      expect(errors.array()[0].msg).toEqual("Username can only contain alphabets, digits and underscores and have a maximum of 20 characters");
    });
  });

  describe('Edit Pet Validation', () => {
    it('should validate correct inputs', async () => {
      req.body = {
        petDetails: {
          petName: 'ValidPetName',
          petSize: 'Medium',
          petBreed: 'Valid Breed'
        }
      };

      await Promise.all(checkEditPetReq.map(validation => validation.run(req)));

      const errors = validationResult(req);
      expect(errors.isEmpty()).toBe(true);
    });

    it('should fail validation for SQL injection attempt in petName', async () => {
      req.body = {
        petDetails: {
          petName: 'ValidPetName; DROP TABLE pets;',
          petSize: 'Medium',
          petBreed: 'Valid Breed'
        }
      };

      await Promise.all(checkEditPetReq.map(validation => validation.run(req)));

      const errors = validationResult(req);
      expect(errors.isEmpty()).toBe(false);
      expect(errors.array()[0].msg).toEqual("Pet name can only contain alphabets and spaces, and have a maximum of 50 characters");
    });

    it('should fail validation for XSS attempt in petName', async () => {
      req.body = {
        petDetails: {
          petName: '<script>alert("XSS")</script>',
          petSize: 'Medium',
          petBreed: 'Valid Breed'
        }
      };

      await Promise.all(checkEditPetReq.map(validation => validation.run(req)));

      const errors = validationResult(req);
      expect(errors.isEmpty()).toBe(false);
      expect(errors.array()[0].msg).toEqual("Pet name can only contain alphabets and spaces, and have a maximum of 50 characters");
    });
  });
});
