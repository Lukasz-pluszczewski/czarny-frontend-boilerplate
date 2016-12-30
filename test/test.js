import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import NotFoundPage from '../src/Pages/NotFoundPage.js';

describe('Test', () => {
  it('NotFound Page', () => {
    const wrapper = shallow(<NotFoundPage />);
    expect(wrapper.find('h4').text()).to.equal('404 Page Not Found');
  });
});
