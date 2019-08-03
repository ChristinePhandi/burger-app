import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios-orders';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGRIDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.3,
	meat: 1.5,
	bacon: 0.7
}

class BurgerBuilder extends Component{
	constructor(props){
		super(props);
		this.state={
			ingredients: null,
			price: 2,
			purchasable: false,
			orderButtonClick: false,
			loading: false,
			error: false
		}
	}

	componentDidMount() {	
		axios.get('https://burger-app-920d4.firebaseio.com/ingridients.json')
			.then(response => {
				this.setState({
					ingredients: response.data 
				});
			})
			.catch(err => {
				this.setState({
					error:true 
				});
			})	
	}

	updatePurchasableState = (ingredients) => {
		const sum = Object.keys(ingredients).map(igKey =>{
			return ingredients[igKey]
		}).reduce((acc,cur) => {
			return acc = acc + cur
		},0)
		this.setState({purchasable: sum > 0})
	}

	addIngridientHandler = (type) => {
		const count = this.state.ingredients[type] + 1;
		const newIngridients = { ...this.state.ingredients};
		newIngridients[type] = count;

		const updatePrice = this.state.price + INGRIDIENT_PRICES[type];
		this.setState({price: updatePrice, ingredients:newIngridients});
		this.updatePurchasableState(newIngridients);
	}

	removeIngridientHandler = (type) => {
		if(this.state.ingredients[type] <= 0){
			return;
		}

		const count = this.state.ingredients[type] - 1;
		const newIngridients = { ...this.state.ingredients};
		newIngridients[type] = count

		const updatePrice = this.state.price - INGRIDIENT_PRICES[type];
		this.setState({price: updatePrice, ingredients:newIngridients});
		this.updatePurchasableState(newIngridients);	
	}

	orderButtonHandler = () => {
		this.setState({orderButtonClick:true})
	}

	backdropHandler = () => {
		this.setState({orderButtonClick:false})
	}

	orderCheckoutHandler = () => {

		const queryParam = [];
		for(let i in this.state.ingredients){
			queryParam.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
		}
		queryParam.push('price='+this.state.price);
		const queryString = queryParam.join('&');
		this.props.history.push({
			pathname : '/checkout',
			search: '?' +queryString
		});
	}

	render(){
		const ingridientsObj = {...this.state.ingredients};
		for(let key in ingridientsObj){
			ingridientsObj[key] = ingridientsObj[key] <= 0;
		}

		let orderSummary = null;
		let burger = null;

		//Burger UI will be loaded if the data already fetched from DB, if not spinner will show up
		if(!this.state.ingredients){

			burger = this.state.error ? 
						<p style={{textAlign:'center'}}> 
							Oooops, seems like the ingredients can't be loaded :(
						</p> 
						: 
						<Spinner />
		}else {
			burger = (<Auxiliary>
						<Burger ingredients={this.state.ingredients}/>
						<BuildControls 
							ingridientAdded={this.addIngridientHandler} 
							ingredientRemoved={this.removeIngridientHandler}
							orderButton={this.orderButtonHandler}
							purchasable={this.state.purchasable}
							disabled={ingridientsObj}
							price={this.state.price}/>
					</Auxiliary>);
			orderSummary = <OrderSummary
								priceTotal={this.state.price}
								orderCancel={this.backdropHandler}
								orderContinue={this.orderCheckoutHandler} 
								ingredients={this.state.ingredients}/>
		}

		if(this.state.loading){
			orderSummary = <Spinner />
		}

		return(
			<Auxiliary>
				<Modal show={this.state.orderButtonClick} backdropClicked={this.backdropHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Auxiliary>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);