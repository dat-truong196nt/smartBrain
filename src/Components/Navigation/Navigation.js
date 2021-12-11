import React from "react";
import 'tachyons'

const Navigation = ({onRouteChange, route}) => {
	return (
		<nav style={{display: 'flex', justifyContent:'flex-end'}}>
			{route === 'signin'
			? <>
				<p onClick={() => onRouteChange('register')} className="f3 underline dim black pa3 pointer">Register</p>
				<p onClick={() => onRouteChange('signin')} className="f3 underline dim black pa3 pointer">Sign out</p>
			</>
			: <p onClick={() => onRouteChange('signin')} className="f3 underline dim black pa3 pointer">Sign in</p>
			}
		</nav>
	);
}

export default Navigation;