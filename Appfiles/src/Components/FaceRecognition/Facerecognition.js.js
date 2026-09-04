import React from 'react';
import './FaceRecognition.css';

{/*This will be a simple component with no states, hence creating the component using functions*/}
const FaceRecognition = ({imageURL, box})=>{
	console.log('I am placed here for testing:Under FaceRecognitioncomponent', imageURL);
	console.log(box.topRow);
	console.log(box.rightCol);
	console.log(box.bottomRow);
	console.log(box.leftCol);
	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id ='inputImage' src ={imageURL} width='500px' height='auto' alt=""/>
				<div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
			</div>
		</div>
	);
}
export default FaceRecognition;