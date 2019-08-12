import * as actionTypes from '../actions/actionTypes';
import {updateObject } from '../../shared/utility';

const INGRIDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.3,
	meat: 1.5,
	bacon: 0.7
}

const initialState = {
	ingredients: null,
	price: 2,
	error: false,
	building: false
}

const addIngredients = (state,action) => {
	const updateIngredient = {[action.ingredientName] : state.ingredients[action.ingredientName] + 1}
	const updateIngredients = updateObject(state.ingredients, updateIngredient);
	const updateState = {
		ingredients: updateIngredients,
		price: state.price + INGRIDIENT_PRICES[action.ingredientName],
		building: true 
	}
	return updateObject(state, updateState);
}

const removeIngredients = (state,action) => {
	const updateIng = {[action.ingredientName] : state.ingredients[action.ingredientName] - 1}
	const updateIngre = updateObject(state.ingredients, updateIng);
	const updateSta = {
		ingredients: updateIngre,
		price: state.price - INGRIDIENT_PRICES[action.ingredientName],
		building: true 
	}
	return updateObject(state, updateSta);
}

const setIngredients = (state,action) => {
	return updateObject(state, {
		ingredients: action.ingredients,
		price:2,
		error: false,
		building: false
	})
}

const fetchIngredientsFailed = (state,action) => {
	return updateObject(state, {error: true});
}

const reducer = (state = initialState, action ) => {
	switch(action.type){
		case actionTypes.ADD_INGREDIENT: return addIngredients(state,action);
		case actionTypes.REMOVE_INGREDIENT: return removeIngredients(state,action);
		case actionTypes.SET_INGREDIENTS: return setIngredients(state,action);	
		case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state,action);
		default: return state;
	}
}

export default reducer;