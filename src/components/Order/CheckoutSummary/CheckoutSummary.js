import React from 'react';
import classes from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
    	<h1>This is ur burger</h1>
    	<div style={{width:'100%', margin: 'auto'}}>
    		<Burger ingredients={props.ingredients}/>
    	</div>
    	<Button clicked={props.checkoutCancel} btnType="Danger">CANCEL</Button>
    	<Button clicked={props.checkoutContinue} btnType="Success">CONTINUE</Button>
    </div>
  );
}

export default checkoutSummary;