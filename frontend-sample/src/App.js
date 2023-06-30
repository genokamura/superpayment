import React from 'react';
import PaymentForm from './PaymentForm';
import ExecuteForm from './ExecuteForm';

const App = () => {
  return (
    <div>
      <h1>Payment API</h1>
      <PaymentForm />
      <ExecuteForm />
    </div>
  );
};

export default App;
