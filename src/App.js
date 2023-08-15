import React, { useContext  }  from 'react';

import './App.css';
import Searche from './components/Searche'
import { LoanTable } from './components/LoanTable';
import DataContext from './context/data-context';



function App() {
 const ctx=useContext(DataContext)
 console.log(ctx.data.length);
  return (
    <React.Fragment>
      <section>
        <Searche/>
      </section>
      {ctx.data.length===0 && <section><p>მონაცემი ვერ მოიძებნა</p></section>}
      {ctx.data.length!==0 && <section><LoanTable /></section>}
      
    </React.Fragment>
  );
}

export default App;
