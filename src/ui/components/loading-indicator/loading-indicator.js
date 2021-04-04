import React from 'react';
import loaderSvg from '../../../assets/3-dot-loader.svg';
import aeSvg from '../../../assets/ae-svg.svg';

const LoadingIndicator = () => {
    
    return (
        <div className='loader'>
            <div className='loader-svg-container'>
                <img src={aeSvg} width='300' height='100'></img>
            </div>
            <div className='loader-svg-container'>
                <img src={loaderSvg} width='300' height='80'></img>
            </div>
        </div>
    )
}

export default LoadingIndicator;
