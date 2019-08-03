import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
  return (
    <div>
    	<ul className={classes.NavigationItems}>
    		<NavigationItem link="/" exact> Burger Builder </NavigationItem>
    		<NavigationItem link="/orders" > Orders </NavigationItem>
    	</ul>
    </div>
  )
}

export default navigationItems;