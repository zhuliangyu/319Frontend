import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './loading-indicator.css'

const LoadingIndicator = () => {
    
    return (
        <div className='loader-wrapper'>
            <section className="loader-container">
                <CircularProgress/>
            </section>
        </div>
    )
}

export default LoadingIndicator;
