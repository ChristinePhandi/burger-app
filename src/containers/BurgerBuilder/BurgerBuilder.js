import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios-orders';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component{
	constructor(props){
		super(props);
		this.state={
			orderButtonClick: false,
		}
	}

	componentDidMount() {
		this.props.onInitIngredients();
	}

	updatePurchasableState = (ingredients) => {
		const sum = Object.keys(ingredients).map(igKey =>{
			return ingredients[igKey]
		}).reduce((acc,cur) => {
			return acc = acc + cur
		},0)
		return sum > 0;
	}

	orderButtonHandler = () => {
		this.setState({orderButtonClick:true})
	}

	backdropHandler = () => {
		this.setState({orderButtonClick:false})
	}

	orderCheckoutHandler = () => {
		this.props.onInitPurchase();
		this.props.history.push('/checkout');
	}

	render(){
		const ingridientsObj = {...this.props.ings};
		for(let key in ingridientsObj){
			ingridientsObj[key] = ingridientsObj[key] <= 0;
		}

		let orderSummary = null;
		let burger = null;

		//Burger UI will be loaded if the data already fetched from DB, if not spinner will show up
		if(!this.props.ings){

			burger = this.props.error ? 
						<p style={{textAlign:'center'}}> 
							Oooops, seems like the ingredients can't be loaded :(
						</p> 
						: 
						<Spinner />
		}else {
			burger = (<Auxiliary>
						<Burger ingredients={this.props.ings}/>
						<BuildControls 
							ingridientAdded={this.props.onIngredientAdd} 
							ingredientRemoved={this.props.onIngredientRemove}
							orderButton={this.orderButtonHandler}
							purchasable={this.updatePurchasableState(this.props.ings)}
							disabled={ingridientsObj}
							price={this.props.price}/>
					</Auxiliary>);
			orderSummary = <OrderSummary
								priceTotal={this.props.price}
								orderCancel={this.backdropHandler}
								orderContinue={this.orderCheckoutHandler} 
								ingredients={this.props.ings}/>
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

const mapStateToProps = (state) => {
	return{
		ings : state.burgerBuilder.ingredients,
		price : state.burgerBuilder.price,
		error: state.burgerBuilder.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		onIngredientAdd : (ignName) => dispatch(burgerBuilderActions.addIngredient(ignName)),
		onIngredientRemove : (ignName) => dispatch(burgerBuilderActions.removeIngredient(ignName)),
		onInitIngredients : () => dispatch(burgerBuilderActions.initIngredients()),
		onInitPurchase : () => dispatch(burgerBuilderActions.purchaseInit())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));