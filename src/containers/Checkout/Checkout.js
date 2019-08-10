import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component {

	checkoutContinueHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	}

	checkoutCancelHandler = () => {
		this.props.history.goBack();
	}

	render() {
		let summary = <Redirect to="/"/>
		if(this.props.ings){
			const purchaseRedirect = this.props.purchased ? <Redirect to="/"/> : null;
			summary = (
				<div>
					{purchaseRedirect}
					<CheckoutSummary 
						checkoutContinue={this.checkoutContinueHandler} 
						checkoutCancel={this.checkoutCancelHandler} 
						ingredients={this.props.ings}/>
					<Route 
						path={this.props.match.path + '/contact-data'} 
						component={ContactData}
						/>
				</div>
			)
		}
		return summary;
	}
}

const mapStateToProps = (state) => {
	return{
		ings : state.burgerBuilder.ingredients,
		purchased : state.order.purchased
	}
}


export default connect(mapStateToProps)(Checkout);