import React from 'react';

const AlertSaved = ({ text }) => {
  return (
    <div className='alert alert-dark' role='alert'>
      <h4 className='alert-heading'>Well done!</h4>
      <p>Your {text} was saved with success.</p>
    </div>
  );
};

export default AlertSaved;
