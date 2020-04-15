import React from 'react';

import './errorMessage.sass';
import img from './error.jpg';

const ErrorMessage = () => {
    return (
        <>
        <div className="error-message">Something went wrong!</div>
        <img src={img} alt="error"/>
        </>   
    ) 
}
export default ErrorMessage;