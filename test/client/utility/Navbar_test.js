/* global describe, it, afterEach, beforeEach */

import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import Navbar from '../../../src/components/utility/Navbar';

const userData = [{
  _id: '1',
  displayName: 'Billy'
}];

describe('Navbar logged in tests', () => {
  let wrapper = null;


  afterEach(done => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('currentUser');
    done();
  });

  beforeEach(done => {
    window.localStorage.setItem('token', 'FAKETOKEN');
    window.localStorage.setItem('currentUser', JSON.stringify(userData[0]));
    wrapper = mount(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    done();
  });

  it('should not show the login button when user is logged in', done => {
    expect(wrapper.find('i.fa.fa-twitch').length).to.eq(0);
    done();
  });

  it('should show the logout button when user is logged in', done => {
    expect(wrapper.find('a').last().html()).to.equal('<a>Logout</a>');
    done();
  });

  it('should show the current user name when logged in', done => {
    expect(wrapper.text()).to.equal('TwinderBrowse StreamsBillyLogout');
    done();
  });

  it('should display link to current user profile when logged in', done => {
    expect(wrapper.find('ul').childAt(2).html()).to.equal('<a href="/users/1">Billy</a>');
    done();
  });
});


describe('Navbar logged out tests', () => {
  let wrapper = null;

  beforeEach(done => {
    window.localStorage.setItem('currentUser', JSON.stringify(userData[0]));
    wrapper = mount(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    done();
  });

  afterEach(done => {
    window.localStorage.removeItem('currentUser');
    done();
  });

  it('should show the login button when user not logged in', done => {
    window.localStorage.removeItem('token');
    wrapper.update();
    expect(wrapper.find('i.fa.fa-twitch').length).to.eq(1);
    done();
  });
});
