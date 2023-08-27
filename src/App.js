import React, { useContext  }  from 'react';
import './App.css'
import Searche from './components/Searche'
import { LoanTable } from './components/LoanTable';
import DataContext from './context/data-context';
import { CountChanged } from './components/CountChanged';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
 const ctx=useContext(DataContext)
 
  return (
    <React.Fragment>
      <section>
        <Searche/>
        {ctx.countSecView && <CountChanged/> }
      </section>
      {ctx.savedData.length===0 && <section><p>მონაცემი ვერ მოიძებნა</p></section>}
      {ctx.savedData.length!==0 && <section><LoanTable /></section>}
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
