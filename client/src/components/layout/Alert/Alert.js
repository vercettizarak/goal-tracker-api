import React, { useContext } from 'react';
import DossierContext from '../../../context/dossier/dossierContext';

const Alert = () => {
  const dossierContext = useContext(DossierContext);
  const { alerts } = dossierContext;
  return (
    <div className='mx-auto w-50'>
      {alerts.length > 0 &&
        alerts.map(alert => (
          <div
            key={alert.id}
            className={`alert alert-${alert.type} alert-dismissable`}>
            <button type='button' className='close' data-dismiss='alert'>
              <span>&times;</span>
            </button>
            <strong>{alert.msg}</strong>
          </div>
        ))}
    </div>
  );
};

export default Alert;
