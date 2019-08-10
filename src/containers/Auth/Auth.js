import React from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';

class Auth extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			controls: {
				email: {
					elementType: 'input',
					elementConfig: {
						type: 'email',
						placeholder: 'Email'
					},
					value: '',
					validation: {
						required: true,
						isEmail: true
					},
					valid: false,
					touched: false
				},
				password: {
					elementType: 'input',
					elementConfig: {
						type: 'password',
						placeholder: 'Password'
					},
					value: '',
					validation: {
						required: true,
						minLength: 6
					},
					valid: false,
					touched: false
				}
			}
		}
	}

	inputChangedHanler = (event, controlName) => {
		const updatedControls = { 
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: event.target.value,
				valid: this.checkInputValidity(event.target.value, this.state.controls[controlName].validation),
				touched: true
			}
		};
		this.setState({
			controls: updatedControls
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
		if(rules.isEmail){
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(value) && isValid;
		}
		if(rules.isNumeric){
			const pattern = /^\d+$/;
			isValid = pattern.test(value) && isValid;
		}
		return isValid;
	}

	render() {
		const formElements = [];
		for(let key in this.state.controls){
			formElements.push({
				id: key,
				config: this.state.controls[key]
			});
		}

		const form = formElements.map(obj => {
			return <Input
				key={obj.id}
				touched={obj.config.touched}
				elementType={obj.config.elementType} 
				elementConfig={obj.config.elementConfig}
				invalid={!obj.config.valid} 
				value={obj.config.value}
				shouldValidate={obj.config.validation}
				changed={(event) => this.inputChangedHanler(event,obj.id)}/>
		})

		return (
			<div className={classes.Auth}>
				<form>
					{form}
					<Button btnType="Success" >SUBMIT</Button>
				</form>
			</div>
		);
	}
}

export default Auth;