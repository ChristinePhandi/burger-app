import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
//Object.key return an array of the key inside Object(props.ingredients) => ['salad', 'bacon', ....]
//First .map() function is for returning an empty array with empty spaces as much as the ingredient value
// it's returning an empty Array(value), ex: Arr(3) => [ ... , ...]
// value is the amount of ingredient, which is accessed from object properties value(props.ingredients[igName])
//Second .map() function is pushing the component to the empty array
//================================================================================================================
//example state : {salad: 2, bacon: 1, cheese: 2}
//['salad','bacon','cheese']==>[ [[..],[..]] ; [[..]] ; [[..],[..]] ]==>[[<BurgerIngredient key=salad 0 type=salad>,
//<BurgerIngredient key=salad 1 type=salad>] ; [<BurgerIngredient key=bacon 0 type=bacon>] ; etc .......]
//================================================================================================================
//reduce() function is for putting all the component into one array, so the length of the array will be total 
// amount of ingridients
	let transformedIngredients = Object.keys(props.ingredients)
		.map(igName => {
			return [...Array(props.ingredients[igName])].map((_,i) => {
				return <BurgerIngredient key={igName + i} type={igName}/>
				})
			})
		
	const transformedIngredientsLength =  transformedIngredients.reduce((acc, currentVal) => {
			return acc.concat(currentVal)
			}, []).length // [] initial value

	if(transformedIngredientsLength === 0){
		transformedIngredients = (<p>Please start adding some ingredients !</p>)
	}
	

  return (
    <div className={classes.Burger}>
    	<BurgerIngredient type="bread-top"/>
    	{transformedIngredients}
    	<BurgerIngredient type="bread-bottom"/>

    </div>
  )
}

export default burger;