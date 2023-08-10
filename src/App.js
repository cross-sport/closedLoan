import React, { useState }  from 'react';

import './App.css';
import Searche from './components/Searche'
import { LoanTable } from './components/LoanTable';
const editHandler=(event)=>{
  console.log(event);
  
  
}
const data=[
  {
      LoanID:2986,
      FullName:'ვერა ფხაკაძე',
      ClientID:2508,
      CardNumber:37001001632,
      LoanAgreementNo:'K/03012',
      LoanAmount:300.00,
      ISO:'USD',
      DisburseDate:'2006-05-19 00:00:00.000',
      CoverDate:'2007-03-19 00:00:00.000',
      Product:"სტანდარტული მიკრო-სესხი",
      LoanNode:"სამტრედია",
      LoanOfficer:'გიორგი კილაძე',
      CloseDate:'2011-02-15 00:00:00.000',
      Disbursed_Officer:"გიორგი კილაძე",
      ApplicationNode:"ქუთაისი 1",
      Status:"naw",
      toggleSelected:false
    },
    {
      LoanID:5876,
      FullName:'მურადი ჯულაყიძე',
      ClientID:4809,
      CardNumber:37001001510,
      LoanAgreementNo:'K/06076',
      LoanAmount:1000.00,
      ISO:'GEL',
      DisburseDate:'2006-05-19 00:00:00.000',
      CoverDate:'2007-03-19 00:00:00.000',
      Product:"განვადება",
      LoanNode:"სამტრედია",
      LoanOfficer:'გიორგი კილაძე',
      CloseDate:'2011-02-15 00:00:00.000',
      Disbursed_Officer:"გიორგი კილაძე",
      ApplicationNode:"ქუთაისი 1",
      Status:<button onClick={editHandler}>edit</button>,
      toggleSelected:false
    
},
  {
      LoanID:2985,
      FullName:'ვერა ფხაკაძე',
      ClientID:2508,
      CardNumber:37001001632,
      LoanAgreementNo:'K/03012',
      LoanAmount:300.00,
      ISO:'USD',
      DisburseDate:'2006-05-19 00:00:00.000',
      CoverDate:'2007-03-19 00:00:00.000',
      Product:"სტანდარტული მიკრო-სესხი",
      LoanNode:"სამტრედია",
      LoanOfficer:'გიორგი კილაძე',
      CloseDate:'2011-02-15 00:00:00.000',
      Disbursed_Officer:"გიორგი კილაძე",
      ApplicationNode:"ქუთაისი 1",
      Status:<button onClick={editHandler}>edit</button>,
      toggleSelected:false
    },
    {
      LoanID:5875,
      FullName:'მურადი ჯულაყიძე',
      ClientID:4809,
      CardNumber:37001001510,
      LoanAgreementNo:'K/06076',
      LoanAmount:1000.00,
      ISO:'GEL',
      DisburseDate:'2006-05-19 00:00:00.000',
      CoverDate:'2007-03-19 00:00:00.000',
      Product:"განვადება",
      LoanNode:"სამტრედია",
      LoanOfficer:'გიორგი კილაძე',
      CloseDate:'2011-02-15 00:00:00.000',
      Disbursed_Officer:"გიორგი კილაძე",
      ApplicationNode:"ქუთაისი 1",
      Status:<button onClick={editHandler}>edit</button>,
      toggleSelected:false
    
},
    {
      LoanID:5878,
      FullName:'მურადი ჯულაყიძე',
      ClientID:4809,
      CardNumber:37001001510,
      LoanAgreementNo:'K/06076',
      LoanAmount:1000.00,
      ISO:'GEL',
      DisburseDate:'2006-05-19 00:00:00.000',
      CoverDate:'2007-03-19 00:00:00.000',
      Product:"განვადება",
      LoanNode:"სამტრედია",
      LoanOfficer:'გიორგი კილაძე',
      CloseDate:'2011-02-15 00:00:00.000',
      Disbursed_Officer:"გიორგი კილაძე",
      ApplicationNode:"ქუთაისი 1",
      Status:<button onClick={editHandler}>edit</button>,
      toggleSelected:false
    
}]

function App() {
 const [loans,setLoans]=useState(data)

 let content=<p>loading</p>
  
  if (loans.length > 0) {
    content = <Searche/>;
  }

  return (
    <React.Fragment>
      <section>
        <Searche/>
      </section>
      <section><LoanTable loans={loans}/></section>
    </React.Fragment>
  );
}

export default App;
