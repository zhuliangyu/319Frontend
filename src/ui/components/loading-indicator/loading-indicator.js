import React from 'react';
import loaderSvg from '../../../assets/3-dot-loader.svg';

const LoadingIndicator = () => {
    
    return (
        <div className='loader'>
            <img src={loaderSvg} width='100' height='100'></img>
        </div>
    )
}

export default LoadingIndicator;
