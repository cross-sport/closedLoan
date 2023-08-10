import React,{useRef} from 'react'
import classes from './Searche.module.css'


 const Searche = (props) => {
    const cardNumberRef = useRef('');
    const loanAgreementNoref = useRef('');
   
  
    function submitHandler(event) {
      event.preventDefault();      
      // could add validation here...
  
      const serchInfo = {
        CardNumber: cardNumberRef.current.value,
        LoanAgreementNo: loanAgreementNoref.current.value,
      };
      
      
  
      // props.onAddMovie(movie);
    }
  
    return (
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          
          <input type='text' id='cardNumber' ref={cardNumberRef} placeholder='პირადი ნომერი'/>
          <input type='text' id='LoanAgreementNo' ref={loanAgreementNoref} placeholder='ხელშეკრულების ნომერი'/>
          
          <button >ძებნა</button>
          <button >გაგზავნა</button>  
          
        </div>      
                
      </form>
    );
}

export default Searche