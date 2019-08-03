import React from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

export default class ContactData extends React.Component {
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
					value: '',
					validation: {},
					valid: true
				}
			},
			formIsValid: false,
			loading: false
		}
	}

	inputChangedHanler = (event, inputIdentifier) => {
		const updatedOrderForm = {...this.state.orderForm};
		const updatedOrderEl = {...updatedOrderForm[inputIdentifier]}

		updatedOrderEl.value = event.target.value;
		updatedOrderEl.valid = this.checkInputValidity(updatedOrderEl.value,updatedOrderEl.validation);
		updatedOrderEl.touched = true;
		updatedOrderForm[inputIdentifier] = updatedOrderEl;

		let formIsValid = true;
		for(let inputIdentifier in updatedOrderForm){
			formIsValid =  updatedOrderForm[inputIdentifier].valid && formIsValid
		}
		this.setState({
			orderForm: updatedOrderForm,
			formIsValid: formIsValid
		});
	}

	checkInputValidity(value, rules){
		let isValid = true;
		if(!rules){
			return true
		}
		if(rules.required){
			isValid = value.trim() !== "" && isValid;
		}
		if(rules.minLength){
			isValid = value.length >= rules.minLength && isValid;
		}
		if(rules.maxLength){
			isValid = value.length <= rules.maxLength && isValid;
		}
		return isValid;
	}

	orderHandler = (event) => {
		event.preventDefault();
		this.setState({loading: true});
		const FormData = {};
		for(let inputName in this.state.orderForm){
			FormData[inputName] = this.state.orderForm[inputName].value;
		}
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: FormData
		}
		axios.post('/orders.json', order)
			.then(response => {
				this.setState({loading: false});
				this.props.history.push('/');
			})
			.catch(err => this.setState({loading: false}) );
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
		if (this.state.loading) {
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
