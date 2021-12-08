import React from "react";
import 'tachyons'
import './ImageLinkForm.scss'

const ImageLinkForm = ({updateUrl, submitBtn}) => {
	return (
		<div>
			<p className="f3 center">This SmartBrain will detect faces in your picture. Git it a try</p>
			<div className="center">
				<div className="pa3 br2 box-shadow" style={{width: '60%'}}>
					<input className="pa2" style={{width: '70%'}} type="text" onChange={updateUrl}></input>
					<button className="pa2 pointer" style={{width: '30%'}} onClick={submitBtn}> Detect</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;