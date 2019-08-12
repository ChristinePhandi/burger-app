import React, {Component} from 'react';
import { connect } from 'react-redux';
import Auxiliary from '../Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
	constructor(props){
		super(props);
		this.state = {
			showSideDrawer: false
		}
	}

	sideDrawerToggleHandler = () => {
		this.setState((prevState) =>{
			return {showSideDrawer: !prevState.showSideDrawer }; 
		});
	}

	sideDrawerCloseHandler = () => {
		this.setState({showSideDrawer: false})
	}

	render(){
		return(
			<Auxiliary>
				<Toolbar 
					isAuth={this.props.isAuthenticated} 
					drawerToggleClicked={this.sideDrawerToggleHandler}/>
				<SideDrawer 
					isAuth={this.props.isAuthenticated} 
					open={this.state.showSideDrawer}
					closed={this.sideDrawerCloseHandler}/>
				<main className={classes.Content}>
					{this.props.children}
				</main>	
			</Auxiliary>	
		)
	}
}

const mapStateToProps = (state) => {
	return{
		isAuthenticated: state.auth.token !== null
	}
}

export default connect(mapStateToProps)(Layout);
