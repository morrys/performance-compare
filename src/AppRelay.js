import React from 'react';
import Form from './FormRelay';
//import './App.css';

import { createStore, StoreProvider } from 'relay-forms-nodeps';

function App() {
  return (
    <StoreProvider store = {createStore()}>
      <div style={{ padding: 15 }}>
        <h2>Relay form</h2>
        <Form />
      </div>
    </StoreProvider>
  );
}

export default App;
