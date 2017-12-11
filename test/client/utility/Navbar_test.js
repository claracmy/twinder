/* global describe, it, afterEach, beforeEach */

import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import Navbar from '../../../src/components/utility/Navbar';

describe('Navbar logged in tests', () => {
  let wrapper = null;

  afterEach(done => {
    window.localStorage.removeItem('token');
    done();
  });

  beforeEach(done => {
    window.localStorage.setItem('token', 'FAKETOKEN');
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
});


describe('Navbar logged out tests', () => {
  let wrapper = null;

  beforeEach(done => {
    wrapper = mount(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    done();
  });

  it('should show the login button when user not logged in', done => {
    window.localStorage.removeItem('token');
    wrapper.update();
    expect(wrapper.find('i.fa.fa-twitch').length).to.eq(1);
    done();
  });

});
