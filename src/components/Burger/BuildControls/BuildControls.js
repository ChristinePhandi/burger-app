import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
	{label: 'Salad', type: 'salad'},
	{label: 'Bacon', type: 'bacon'},
	{label: 'Cheese', type: 'cheese'},
	{label: 'Meat', type: 'meat'},
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
    	<p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
    	{controls.map(control => {
    		return <BuildControl 
    					added={() => props.ingridientAdded(control.type)}
    					removed={() => props.ingredientRemoved(control.type)}
    					key={control.label} 
    					ingridientLabel={control.label}
    					disabled={props.disabled[control.type]}
    				/>
    	})}
    	<button 
    		className={classes.OrderButton}
    		disabled={!props.purchasable}
    		onClick={props.orderButton}>{props.isAuth? 'ORDER NOW' : 'SIGN IN'}</button>
    </div>
  )
}

export default buildControls;