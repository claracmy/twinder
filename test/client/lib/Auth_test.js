/* global describe, it, afterEach */

import { expect } from 'chai';

import Auth from '../../../src/lib/Auth';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YTJlNzE2YzU3OTRlYzFlZDJjZjAxYjAiLCJpYXQiOjE1MTI5OTMxMzIsImV4cCI6MTUxMjk5NjczMn0.FCXUbMxF_ABdBH4BgxQ4hZzlJLM_gIxx8wSIV0v8r6U';

describe('Auth tests', () => {

  afterEach(done => {
    window.localStorage.removeItem('token');
    done();
  });

  it('`setToken()` should set a value to localStorage', done => {
    Auth.setToken(token);
    expect(window.localStorage.getItem('token')).to.equal(token);
    done();
  });

  it('`isAuthenticated()` should return true if there is a token in localStorage', done => {
    window.localStorage.setItem('token', token);
    expect(Auth.isAuthenticated()).to.be.true;
    done();
  });

  it('`getPayload()` should return an object with userId', done => {
    window.localStorage.setItem('token', token);
    expect(Auth.getPayload().userId).to.be.a('string');
    done();
  });
});
