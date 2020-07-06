import {shallow} from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import Pokedex from './Pokedex';
import {BrowserRouter} from 'react-router-dom'

describe('<Pokedex />', () => {
  const shallowComponent = () => shallow(<Pokedex />);

  it('renders correctly', () => {
    const tree = renderer.create( <BrowserRouter><Pokedex /></BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  /*it('should render copyright on the license', () => {
    const wrapper = shallowComponent();
    expect(wrapper.find('.license').text()).toContain(
      'Copyright (c) 2018 Martin Garcia Monterde',
    );
  });*/
});