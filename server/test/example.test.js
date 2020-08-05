const assert = require('assert');
const request = require('request');
const expect = require('chai').expect;

describe('User search test', () => {
  it('Search for a user or location', function (done) {
    request(
      'http://localhost:4000/api/users/search?page=1&search=Madhavan',
      function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      }
    );
  });
  it('Empty search string should throw error', function (done) {
    request('http://localhost:4000/api/users/search?page=1&search=', function (
      error,
      response,
      body
    ) {
      expect(response.statusCode).to.equal(500);
      done();
    });
  });
});

describe('User profile test', () => {
  it('Search for a user with user id', function (done) {
    request('http://localhost:4000/api/user?userId=155659213', function (
      error,
      response,
      body
    ) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
  it('Empty userId should throw error', function (done) {
    request('http://localhost:4000/api/user?userId=', function (
      error,
      response,
      body
    ) {
      expect(response.statusCode).to.equal(500);
      done();
    });
  });
});
