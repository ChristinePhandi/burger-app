import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
  return (
    <div>
    	<ul className={classes.NavigationItems}>
    		<NavigationItem link="/" exact> Burger Builder </NavigationItem>
    		{props.isAuth ? <NavigationItem link="/orders" > Orders </NavigationItem> : null}
    		{!props.isAuth ? <NavigationItem link="/auth" > Authenticate </NavigationItem>
                            :
                            <NavigationItem link="/logout" > Logout </NavigationItem> 
    					 }
    	</ul>
    </div>
  )
}

export default navigationItems;