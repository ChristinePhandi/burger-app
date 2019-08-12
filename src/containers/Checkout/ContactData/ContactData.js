import React from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { updateObject, checkInputValidity } from '../../../shared/utility';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions';

class ContactData extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			orderForm: {
				name: {
					elementType: 'input',
					elementConfig: {
						type: 'text',
						placeholder: 'Your name'
					},
					value: '',
					validation: {
						required: true
					},
					valid: false,
					touched: false
				},	
				street: {
					elementType: 'input',
					elementConfig: {
						type: 'text',
						placeholder: 'Your address'
					},
					value: '',
					validation: {
						required: true
					},
					valid: false,
					touched: false
				},
				zipCode: {
					elementType: 'input',
					elementConfig: {
						type: 'text',
						placeholder: 'ZIP Code'
					},
					value: '',
					validation: {
						required: true,
						minLength: 6,
						maxLength: 6
					},
					valid: false,
					touched: false
				},
				country: {
					elementType: 'input',
					elementConfig: {
						type: 'text',
						placeholder: 'County'
					},
					value: '',
					validation: {
						required: true
					},
					valid: false,
					touched: false
				},			
				email: {
					elementType: 'input',
					elementConfig: {
						type: 'email',
						placeholder: 'Email'
					},
					value: '',
					validation: {
						required: true
					},
					valid: false,
					touched: false
				},
				deliveryMethod: {
					elementType: 'select',
					elementConfig: {
						options: [
							{value:'fastest', displayValue: 'Fastest'},
							{value:'standart', displayValue: 'Standart'},
						]
					},
					value: 'fastest',
					validation: {},
					valid: true
				}
			},
			formIsValid: false
		}
	}

	inputChangedHanler = (event, inputIdentifier) => {		
		const updatedOrderEl = updateObject(this.state.orderForm[inputIdentifier],{
			value : event.target.value,
			valid : checkInputValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
			touched : true
		})

		const updatedOrderForm = updateObject(this.state.orderForm,{
			[inputIdentifier] :  updatedOrderEl
		})

		let formIsValid = true;
		for(let inputIdentifier in updatedOrderForm){
			formIsValid =  updatedOrderForm[inputIdentifier].valid && formIsValid
		}
		this.setState({
			orderForm: updatedOrderForm,
			formIsValid: formIsValid
		});
	}

	orderHandler = (event) => {
		event.preventDefault();
		const FormData = {};
		for(let inputName in this.state.orderForm){
			FormData[inputName] = this.state.orderForm[inputName].value;
		}

		const order = {
			ingredients: this.props.ings,
			price: this.props.price,
			orderData: FormData,
			userId: this.props.userId
		}

		this.props.onPurchaseBurger(order, this.props.token);
	}

	render() {
		const {orderForm} = this.state;
		const formElements = [];
		for(let key in orderForm){
			formElements.push({
				id: key,
				config: orderForm[key]
			});
		}

		let form = (<form onSubmit={this.orderHandler}>
					{formElements.map(obj => (
						<Input
							key={obj.id} 
							touched={obj.config.touched}
							elementType={obj.config.elementType} 
							elementConfig={obj.config.elementConfig}
							invalid={!obj.config.valid} 
							value={obj.config.value}
							shouldValidate={obj.config.validation}
							changed={(event) => this.inputChangedHanler(event,obj.id)}/>
					))}
					<Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
				</form>);
		if (this.props.loading) {
			form = <Spinner/>
		}
		return (
			<div className={classes.ContactData}>
				<h4>Please enter your data</h4>
				{form}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return{
		ings : state.burgerBuilder.ingredients,
		price : state.burgerBuilder.price,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		onPurchaseBurger : (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData,axios));