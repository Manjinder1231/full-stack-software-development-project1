import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain.png';
{/*This will be a simple component with no states, hence creating the component using functions*/}
const Logo = ()=>{
	return (
		<div className='ma4 mt0'>
			<Tilt>
				<div className="br2 shadow-2 Tilt" style={{ height: '150px', width: '150px'}}>
	        		<h1 pa3><img style={{paddingTop: '5px'}} src={brain} alt="Logo"/></h1>
	      		</div>
	    	</Tilt>
    	</div>
	);
}
export default Logo;