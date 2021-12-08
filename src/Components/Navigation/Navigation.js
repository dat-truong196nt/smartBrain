import React from "react";
import 'tachyons'

const Navigation = () => {
	return (
		<nav style={{display: 'flex', justifyContent:'flex-end'}}>
			<p className="f3 underline dim black pa3 pointer">Sign out</p>
		</nav>
	);
}

export default Navigation;