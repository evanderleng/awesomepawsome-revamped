const {Validator} = require('../../util/validator');

test('Input valid Password test', () => {
        const validation = new Validator({ password: 'Passw0rd!' }, { password: 'passwordRule' });
        expect(validation.passes()).toBe(true);
});

test('Password requirenments test', () => {
    const validation = new Validator({ password: 'password' }, { password: 'passwordRule' });
    expect(validation.fails()).toBe(true);
    expect(validation.errors.first('password')).toBe('Password must be at least 8 characters and contain one uppercase, lowercase, digit and symbol');

});
