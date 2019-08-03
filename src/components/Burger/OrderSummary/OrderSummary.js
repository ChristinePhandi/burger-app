import React from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
	const ingredientsSummary = Object.keys(props.ingredients)
		.map(igKey => {
			return <li key={igKey}>
						<span style={{textTransfrom: 'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}
					</li>
		})

  return (
    <div>
    	<h3>Your Order</h3>
    	<p>Here's the ingredients :</p>
    	<ul>
    		{ingredientsSummary}
    	</ul>
        <p><strong>Total : ${props.priceTotal.toFixed(2)}</strong></p>
    	<p>Checkout ? </p>
        <Button clicked={props.orderContinue} btnType="Success">YAS !!!</Button>
        <Button clicked={props.orderCancel} btnType="Danger">NOPE</Button>
    </div>
  )
}

export default orderSummary;