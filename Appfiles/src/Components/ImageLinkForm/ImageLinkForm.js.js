import React from 'react';
import './ImageLinkForm.css';
{/*This will be a simple component with no states, hence creating the component using functions*/}
const ImageLinkForm = ({onInputChange, onSubmit})=>{
	return (
		<div>
			<p className='f3'>
				{'This project will detect faces in your pictures. Feel free to try it'}
			</p>
			<div className='center'>
				<div className='form center pa4 br3 shadow-5'>
					<input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
					<button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onSubmit}>Detect</button>
				</div>
			</div>
    	</div>
	);
}
export default ImageLinkForm;