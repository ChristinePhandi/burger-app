import React from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

export default class Checkout extends React.Component {
	constructor(props) {
		super(props);
		this.state ={
			ingredients: null,
			price: 0
		}
	}

	componentWillMount() {
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		let price = 0;
		for(let param of query.entries()){
			if (param[0] === 'price') {
				price=param[1];
			} else {
				ingredients[param[0]] = +param[1];
			}
		}
		this.setState({
			ingredients: ingredients,
			price: price 
		});
	}

	checkoutContinueHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	}

	checkoutCancelHandler = () => {
		this.props.history.goBack();
	}

	render() {
		return (
			<div>
				<CheckoutSummary 
					checkoutContinue={this.checkoutContinueHandler} 
					checkoutCancel={this.checkoutCancelHandler} 
					ingredients={this.state.ingredients}/>
				<Route 
					path={this.props.match.path + '/contact-data'} 
					render={(props) => (<ContactData 
										ingredients={this.state.ingredients} 
										price={this.state.price}
										{...props}/>)}/>
			</div>
		);
	}
}
