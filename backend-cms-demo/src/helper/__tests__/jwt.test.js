const jwt = require('../jwt');
const jsonwebtoken = require('jsonwebtoken');

describe('generateToken', () => {
  test('it should call jwt.sign with correct userId and expired', () => {
    const userId = 1;
    const expired = 60;
    // const sign = '1234'
    // const secret = 'test';

    // const tokenObject = {
    //   sub: userId,
    //   exp: Math.floor(Date.now() / 1000) + expired * 60
    // };

    jsonwebtoken.sign = jest.fn();

    jwt.generateToken({ userId: userId }, expired);

    expect(jsonwebtoken.sign);
  });
});
