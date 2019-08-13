import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';
import React from 'react';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<NavigationItems />) ;
	})

	it('should render BurgerBuilder and Authenticate if not Authenticate(2 items)', () => {
		expect(wrapper.find(NavigationItem)).toHaveLength(2);
	});

	it('should render BurgerBuilder, logout, Orders if Authenticate(3 items)', () => {
		wrapper.setProps({isAuth: true})
		expect(wrapper.find(NavigationItem)).toHaveLength(3);
	});

	it('should contain logout if Authenticate(1 items)', () => {
		wrapper.setProps({isAuth: true})
		expect(wrapper.contains(<NavigationItem link="/logout" > Logout </NavigationItem>)).toEqual(true);
	});
});