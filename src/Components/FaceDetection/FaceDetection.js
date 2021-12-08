import React from "react";
import './FaceDetection.scss'
import "tachyons";

const createBoundingBoxs = (boxs) => boxs.reduce(
	(acc, box) => {
		acc.push(<div className='bounding-box' style={{top: box.top, bottom: box.bottom, left: box.left, right: box.right}}></div>);
		return acc;
	}, []
);

const FaceDetection = ({imageUrl, boxs}) => {
	return imageUrl ? (
		<div className="pa3 ma3" style={{ display: "flex", justifyContent: "center" }}>
			<div className='absolute'>
				<img id='imgToDetect' alt="img-detect" src={imageUrl} style={{width: '500px', height: 'auto'}}></img>
				{createBoundingBoxs(boxs)}
			</div>
		</div>
	) : (
		<div
			className="pa3 ma3"
			style={{ display: "flex", justifyContent: "center" }}
		></div>
	);
};

export default FaceDetection;
