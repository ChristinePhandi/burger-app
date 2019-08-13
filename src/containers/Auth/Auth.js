import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import { updateObject, checkInputValidity } from '../../shared/utility';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

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
			},
			isSignUp: true
		}
	}

	componentDidMount() {
		if(!this.props.building && this.props.authRedirectPath !== '/'){
 			this.props.onSetAuthRedirectPath();
		}
	}

	inputChangedHanler = (event, controlName) => {
		const updatedControls = updateObject(this.state.controls, {
			[controlName]: updateObject(this.state.controls[controlName],{
				value: event.target.value,
				valid: checkInputValidity(event.target.value, this.state.controls[controlName].validation),
				touched: true
			})
		})

		this.setState({
			controls: updatedControls
		});
	}

	formSubmitHandler = (event) => {
		event.preventDefault();
		this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
	}

	switchAuthModeHandler = () => {
		this.setState(prevState => {
			return {isSignUp: !prevState.isSignUp};
		});
	}

	render() {
		const formElements = [];
		for(let key in this.state.controls){
			formElements.push({
				id: key,
				config: this.state.controls[key]
			});
		}

		let form = formElements.map(obj => {
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

		if(this.props.loading){
			form = <Spinner />
		}

		let errorMessage = null;

		if(this.props.error){
			errorMessage = <p>{this.props.error.message}</p>
		}

		let authRedirect = null;
		if(this.props.isAuth){
			authRedirect = <Redirect to={this.props.authRedirectPath}/>
		}

		return (
			<div className={classes.Auth}>
				{authRedirect}
				{this.state.isSignUp ? <p className={classes.title}>REGISTER</p> : <p className={classes.title}>SIGN IN</p>}
				<form onSubmit={this.formSubmitHandler}>
					{form}
					<Button btnType="Success" >SUBMIT</Button>
				</form>
				<Button 
					clicked={this.switchAuthModeHandler}
					btnType="Danger" >
					SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'REGISTER'}
				</Button>
				{errorMessage}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return{
		loading: state.auth.loading,
		error: state.auth.error,
		isAuth: state.auth.token !== null,
		building: state.burgerBuilder.building,
		authRedirectPath: state.auth.authRedirectPath
	};
}

const mapDispatchToProps = (dispatch) => {
	return{
		onAuth : (email,password, isSignUp) => dispatch(actions.auth(email,password, isSignUp)),
		onSetAuthRedirectPath : () => dispatch(actions.setAuthRedirectPath('/'))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);