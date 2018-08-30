import * as React from 'react';
import { shallow } from 'enzyme';

import ProductDetails from './ProductDetails';

describe('ProductDetails ', () => {

    it('should render correctly', () => {
        const wrapper = shallow(<ProductDetails />);
        expect(wrapper).toBeDefined();
        expect(wrapper).toMatchSnapshot();
    });

    it('should set image url in localstorage', () => {
        const wrapper = shallow(<ProductDetails />);
        const localStorageImage = localStorage.getItem('productImage');
        expect(localStorageImage).toBe('https://www.levi.in/dw/image/v2/BBRC_PRD/on/demandware.static/-/Sites-LeviMaster-Catalog/en_IN/dw1b12cc01/images/hi-res/169600113/169600113_01_Front.jpg?sw=600&sh=600');
    });

    it('should change size selection on click', () => {
        const wrapper = shallow(<ProductDetails />);
        const component = wrapper.instance() as ProductDetails;
        wrapper.find('select').at(0).simulate('change', { currentTarget: { value: 'M' } });
        expect(component.state.size).toBe('M');
    });

    it('should change source selection on click', () => {
        const wrapper = shallow(<ProductDetails />);
        const component = wrapper.instance() as ProductDetails;
        wrapper.find('select').at(1).simulate('change', { currentTarget: { value: 'Suvidha Yamuna Nagar' } });
        expect(component.state.source).toBe('Suvidha Yamuna Nagar');
    });

    it('should determine price on the basis of source selected', () => {
        const wrapper = shallow(<ProductDetails />);
        const component = wrapper.instance() as ProductDetails;
        const getPriceMock = jest.spyOn(component, 'getPrice');
        wrapper.find('select').at(1).simulate('change', { currentTarget: { value: 'Suvidha Yamuna Nagar' } });
        expect(getPriceMock).toHaveBeenCalled();
        expect(component.state.price).toBe('999');    
    });

    it('should set product details in localstorage on Add to cart button click', () => {
        const wrapper = shallow(<ProductDetails />);
        wrapper.find('button').at(0).simulate('click');
        const localStorageProduct = localStorage.getItem('productDetail');
        expect(localStorageProduct).toBe(`{"ProductBrand":"Levis","ProductPrice":"999","ProductSex":"Men","ProductSize":"L","ProductTitle":"LEVI'S® BATWING LOGO TEE"}`);
    });

    it('should enable Go to Cart button on Add to cart button click', () => {
        const wrapper = shallow(<ProductDetails />);
        const component = wrapper.instance() as ProductDetails;
        wrapper.find('button').at(0).simulate('click');
        expect(component.state.cartBtnDisable).toBeFalsy();
    });
});