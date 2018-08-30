import * as React from 'react';
import { shallow } from 'enzyme';

import Cart from './Cart';

describe('ProductDetails ', () => {

    it('should render correctly', () => {
        const wrapper = shallow(<Cart />);
        expect(wrapper).toBeDefined();
        expect(wrapper).toMatchSnapshot();
    });

    it('should chnage product quantity on click', () => {
        const wrapper = shallow(<Cart />);
        const component = wrapper.instance() as Cart;
        wrapper.find('input').simulate('change', {currentTarget: {value: 3}});
        expect(component.state.quant).toBe(3);
    });
});