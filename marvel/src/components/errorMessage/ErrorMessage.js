import React from 'react';
import errorMessage from './error.gif'

const ErrorMessage = () => {
    return (
        <img
            style={{display:'block', width:"250px", height : "250px", objectFit:'contain', margin:"0 auto" }}
            src={errorMessage}
            alt="Error"
        />
    );
};

export default ErrorMessage;