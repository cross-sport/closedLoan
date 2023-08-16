import React,{useRef} from 'react'
import classes from './Searche.module.css'
import { useContext } from 'react';
import DataContext from '../context/data-context';



 const Searche = (props) => {
    const cardNumberRef = useRef('');
    const loanAgreementNoref = useRef('');
  const ctx=useContext(DataContext)
  
  //searche button
    function submitHandler(event) {
      event.preventDefault();      
      
      const serchInfo = {
        CardNumber: cardNumberRef.current.value,
        LoanAgreementNo: loanAgreementNoref.current.value,
      };
        
      ctx.searcheButtonHandler(serchInfo.CardNumber,serchInfo.LoanAgreementNo);
    }
  
    return (
      <form>
        <div className={classes.control}>
          
          <input type='text' id='cardNumber' ref={cardNumberRef} placeholder='პირადი ნომერი'/>
          <input type='text' id='LoanAgreementNo' ref={loanAgreementNoref} placeholder='ხელშეკრულების ნომერი'/>
          
          <button onClick={submitHandler}>ძებნა</button>
          <button onClick={ctx.sendRequestHandler} >გაგზავნა</button>  
          
        </div>      
                
      </form>
    );
}

export default Searche