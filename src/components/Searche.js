import React,{useRef} from 'react'
import classes from './Searche.module.css'
import { useContext } from 'react';
import DataContext from '../context/data-context';

 const Searche = () => {
    const cardNumberRef = useRef('');
    const loanAgreementNoref = useRef('');
  const ctx=useContext(DataContext)
  
  //searche button
    function searchButtonHandler(event) {
      event.preventDefault();
      const serchInfo = {
        CardNumber: cardNumberRef.current.value,
        LoanAgreementNo: loanAgreementNoref.current.value,
      };
        
      ctx.searcheButtonHandler(serchInfo.CardNumber,serchInfo.LoanAgreementNo);
    }

//     const submitHandler=(e)=>{
// e.preventDefault();
// ctx.sendRequestHandler()
//     }
  
       
    return (
      <div>
        <div className={classes.control}>
          
          <input type='text' id='cardNumber' ref={cardNumberRef} placeholder='პირადი ნომერი'/>
          <input type='text' id='LoanAgreementNo' ref={loanAgreementNoref} placeholder='ხელშეკრულების ნომერი'/>
          
          <button  onClick={searchButtonHandler}>ძებნა</button>
          <button disabled={ctx.disableButton} style={{backgroundColor : ctx.disableButton && 'grey' , color:ctx.disableButton && '#fe7581'}}  onClick={ctx.sendRequestHandler}>{ctx.disableButton?'აირჩიეთ მხოლოდ 1':'გაგზავნა'}</button>  
          <button onClick={ctx.countSecViewHandler} className={classes.view}>+</button>
        </div>      
        
      </div>
    );
}

export default Searche