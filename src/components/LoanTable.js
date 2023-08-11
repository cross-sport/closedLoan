import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import Select from 'react-select'
import classes from './LoanTable.module.css'
import acc from "./acc.png"
import { useContext } from 'react';
import DataContext from '../context/data-context';



const options = [
  { value: 'მიღებული', label: 'მიღებული' },
  { value: 'ნაწილობრივ მიღებული', label: 'ნაწილობრივ მიღებული' },
]


export const LoanTable = (props) => {
  const ctx=useContext(DataContext)

  const [packN,setPackN]=useState([]) // შეკვრის N
  const [boxN,setBoxN]=useState([]) //ყუთის N
  const [savedData,setSavedData]=useState([])  // {id , value}
  const [data,setData]=useState(props.loans)

 
   
  const handleCheck = (e, row) => {
    
    const existinItem=savedData.find(item=>{return item.id===row.LoanID})
    if (!existinItem){
      setSavedData((prevState)=>([...prevState,{id:row.LoanID,value:e.value}]));
    } else {
            existinItem.id=row.LoanID;
            existinItem.value=e.value;
    }
    
    colorHandler(row,false)
     
 };
const handlePackN=(value,row)=>{
setPackN(value)
colorHandler(row,false)

}
const handleBoxN=(value,row)=>{
  setBoxN(value)
  colorHandler(row,false)
}
  
// accept
const accepHandler=(e,row)=>{
 e.preventDefault()
 // დაექსეპტებული ობჯექტი
 //შესასწორებელი
 const accptInfo={
  loanId:savedData[0].id,
  Status:savedData[0].value,
  packN:packN,
  boxN:boxN,
 }
 
 ctx.updateData(accptInfo)
 colorHandler(row,true)
 setSavedData([])
 
}
//accept color

const colorHandler=(row,action)=>{
  const updatedData = data.map(item => {
    if (row.LoanID !== item.LoanID) {
      return item;
    }
  
    return {
      ...item,
      toggleSelected: action
    };
  });
  
  setData(updatedData);
}
const conditionalRowStyles = [
  {
    when: row => row.toggleSelected,
    style: {
      backgroundColor: "#e8fed5",
      userSelect: "none"
    }
  }];
  
  // Check current page has selected items
    
  
  const columns=[
    {
      name: 'სესხის N',
      width: "6rem" ,      
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
    
      <input className={classes.input} type='text' onChange={(e)=>handlePackN(e.target.value,row)}/>
    ),
},
  {
    name: "ყუთის N",
    
    cell: (row) => (
      <input className={classes.input} type='text' onChange={(e)=>handleBoxN(e.target.value,row)}/>
    ),
},
{
  
  width: "4.5rem" ,
  cell: (row) => (
    <a href='submit' className={classes.btn}  onClick={(e)=>accepHandler(e,row)}><img className={classes.ico} src={acc}></img></a>
    
  ),
},
  
  ];

  // const data = props.loans

  


 

  
  console.log('ctx',ctx.sendData);
  
  
  
  
  return (

     <DataTable columns={columns} data={data} fixedHeader  conditionalRowStyles={conditionalRowStyles}   />
  )
}
