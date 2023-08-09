import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import Select from 'react-select'
import classes from './LoanTable.module.css'

const options = [
  { value: 'მიღებული', label: 'მიღებული' },
  { value: 'ნაწილობრივ მიღებული', label: 'ნაწილობრივ მიღებული' },
]


export const LoanTable = (props) => {

  const [packN,setPackN]=useState([]) // შეკვრის N
  const [boxN,setBoxN]=useState([]) //ყუთის N
  const [savedData,setSavedData]=useState([])  // {id , value}

 
   
  const handleCheck = (e, row) => {
    
    const existinItem=savedData.find(item=>{return item.id===row.LoanID})
    if (!existinItem){
      setSavedData((prevState)=>([...prevState,{id:row.LoanID,value:e.value}]));
    } else {
            existinItem.id=row.LoanID;
            existinItem.value=e.value;
    }
    
     console.log(savedData);
     
 };
const handlePackN=(value)=>{
setPackN(value)



}
const handleBoxN=(value)=>{
  setBoxN(value)


}
  
  
  // Check current page has selected items
    
  
  const columns=[
    {
      name: 'სესხის N',
      
      selector: row => row.LoanID,
  },
    {
      name: 'სახელი და გვარი',
      selector: row => row.FullName,
  },
    {
      name: 'პირადი ნომერი',
      selector: row => row.CardNumber,
  },
    {
      name: 'ხელშეკრულების N',
      selector: row => row.LoanAgreementNo,
  },
    {
      name: 'გაცემის თარიღი',
      selector: row => row.DisburseDate,
  },
    {
      name: 'დახურვის თარიღი',
      selector: row => row.CloseDate,
  },
    {
      name: 'ფილიალი',
      selector: row => row.LoanNode,
  },
  {
    name: "სტატუსი",
    selector: row => row.Status,
    cell: (row) => (
      <Select className={classes.select} options={options} onChange={(e) => handleCheck(e,row)}/>
    ),
    
},
  {
    name: "შეკვრის N",
    
    cell: (row) => (
    
      <input className={classes.input} type='text' onChange={(e)=>handlePackN(e.target.value)}/>
    ),
},
  {
    name: "ყუთის N",
    
    cell: (row) => (
      <input className={classes.input} type='text' onChange={(e)=>handleBoxN(e.target.value)}/>
    ),
},
  
  ];


  const data = props.loans
  return (

     <DataTable columns={columns} data={data} fixedHeader 
    />
  )
}
