const {
    checkAddUserReq,
    checkLoginReq,
    checkEditProfileReq,
    checkEditPetReq
  } = require('../../middleware/validators/userValidator');
  const { validationResult } = require('express-validator');
  
  describe('Validation Tests', () => {
    describe('Add User Validation', () => {
        it('should validate username, password, and email correctly', async () => { 
          const req = {
            body: {
              username: 'valid_username',
              password: 'ValidPassword1!',
              email: 'validemail@example.com'
            }
          };
    
          await Promise.all(checkAddUserReq.map(validation => validation(req, {}, () => {})));
    
          const errors = validationResult(req);
          expect(errors.isEmpty()).toBe(true);
        });
    
        it('should fail validation for invalid inputs', async () => { 
          const req = {
            body: {
              username: 'invalid-username!', // invalid character
              password: 'weakpassword',      // no uppercase or symbol
              email: 'invalidemail@com'      // invalid email format
            }
          };
    
          await Promise.all(checkAddUserReq.map(validation => validation(req, {}, () => {})));
    
          const errors = validationResult(req);
          expect(errors.isEmpty()).toBe(false);
          expect(errors.array().length).toBeGreaterThan(0);
        });
      });
  
    describe('Login Validation', () => {
      it('should validate username and password correctly', async () => {
        const req = {
          body: {
            username: 'valid_username',
            password: 'ValidPassword1!'
          }
        };
  
        await Promise.all(checkLoginReq.map(validation => validation(req, {}, () => {})));
  
        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(true);
      });
  
      it('should fail validation for missing username or password', async () => {
        const req = {
          body: {
          }
        };
  
        await Promise.all(checkLoginReq.map(validation => validation(req, {}, () => {})));
  
        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(false);
        expect(errors.array().length).toBeGreaterThan(0);
      });
    });
  
    describe('Edit Profile Validation', () => {
      it('should validate username, email, and address correctly', async () => {
        const req = {
          body: {
            username: 'valid_username',
            email: 'validemail@example.com',
            address: 'Valid Address'
          }
        };
  
        await Promise.all(checkEditProfileReq.map(validation => validation(req, {}, () => {})));
  
        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(true);
      });
  
      it('should fail validation for invalid username or email', async () => {
        const req = {
          body: {
            username: 'invalid-username!',
            email: 'invalidemail@com'      
          }
        };
  
        await Promise.all(checkEditProfileReq.map(validation => validation(req, {}, () => {})));
  
        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(false);
        expect(errors.array().length).toBeGreaterThan(0);
      });
    });
  
    describe('Edit Pet Validation', () => {
      it('should validate pet name, size, and breed correctly', async () => {
        const req = {
          body: {
            petDetails: {
              petName: 'ValidPetName',
              petSize: 'Medium',
              petBreed: 'Valid Breed'
            }
          }
        };
  
        await Promise.all(checkEditPetReq.map(validation => validation(req, {}, () => {})));
  
        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(true);
      });
  
      it('should fail validation for invalid pet name or age', async () => {
        const req = {
          body: {
            petDetails: {
              petName: 'InvalidPetName!', 
            }
          }
        };
  
        await Promise.all(checkEditPetReq.map(validation => validation(req, {}, () => {})));
  
        const errors = validationResult(req);
        expect(errors.isEmpty()).toBe(false);
        expect(errors.array().length).toBeGreaterThan(0);
      });
    });
  });
  