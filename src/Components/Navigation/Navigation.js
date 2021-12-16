import React from "react";
import 'tachyons'

const NavDisplay = (route, onRouteChange, onSignOut) => {
	console.log(route);
	switch(route) {
		case 'signin':
			return <p onClick={() => onRouteChange('register')} className="f3 underline dim black pa3 pointer">Register</p>;
		case 'home':
			return <p onClick={() => {onSignOut();onRouteChange('signin')}} className="f3 underline dim black pa3 pointer">Sign out</p>;
		case 'signout':
			return <p onClick={() => {onSignOut();onRouteChange('signin')}} className="f3 underline dim black pa3 pointer">Sign out</p>;
		case 'register':
			return <p onClick={() => onRouteChange('signin')} className="f3 underline dim black pa3 pointer">Sign in</p>;
		default:
			return;
	}
}

const Navigation = ({route, onRouteChange, onSignOut}) => {
	return (
		<nav style={{display: 'flex', justifyContent:'flex-end'}}>
		{NavDisplay(route, onRouteChange, onSignOut)}
		</nav>
	);
}

export default Navigation;