import React, { useState }  from 'react';

import './App.css';
import Searche from './components/Searche'
import { LoanTable } from './components/LoanTable';


function App() {
 
  return (
    <React.Fragment>
      <section>
        <Searche/>
      </section>
      <section><LoanTable /></section>
    </React.Fragment>
  );
}

export default App;
