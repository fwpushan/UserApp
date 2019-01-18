import request from 'supertest';
// const App = require('../../server/server');
import * as App from '../../server/server'
const app = App.default();

describe('Test Jest Works', () => {
  test('1 is 1', () => {
    expect(1).toBe(1);
  });
});

describe('Test test endpoint', () => {
  test('It should response the GET method', (done) => {
    request(app).get('/test').then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('Hello world');
        done();
    });
  });
});

describe('Test Retrieve all Posts endpoint', () => {
  test('It should response the GET method', (done) => {
    request(app).get('/api/posts').then((response) => {
      // console.log(response);
      const { text, statusCode } = response;
      const res = JSON.parse(text);
      expect(statusCode).toBe(200);
      done();
    });
  });
});

describe('A Post Requires A Body', () => {
  test('it should return an error', (done) => {
    request(app).post('/api/posts').then((response) => {
      const { body, statusCode } = response;
      expect(statusCode).toBe(400);
      expect(body).toHaveProperty('message');
      done();
    });
  });
});
