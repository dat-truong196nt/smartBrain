import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'
import './Logo.css'
import 'tachyons'

const Logo = () => {
	return (
		<Tilt className="tilt pa2">
			<div className="pa3 ba-gradient"><img alt="Logo" src={brain} ></img></div>
		</Tilt>
	);
}

export default Logo;