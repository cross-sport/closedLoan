import React from 'react'
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
  
// accept
const accepHandler=(e,row)=>{
 e.preventDefault()
 ctx.colorHandler(row,true)
}
  
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
      <Select className={classes.select} options={options} onChange={(e) =>ctx.acceptData('status',row,e.value) }/> //handleCheck(e,row)
    ),
    
},
  {
    name: "შეკვრის N",
    
    cell: (row) => (
    
      <input className={classes.input} type='text' onChange={(e)=>ctx.acceptData('packN',row,e.target.value)}/>
    ),
},
  {
    name: "ყუთის N",
    
    cell: (row) => (
      <input className={classes.input} type='text' onChange={(e)=>ctx.acceptData('boxN',row,e.target.value)}/>
    ),
},
{
  
  width: "4.5rem" ,
  cell: (row) => (
    <a href='submit' className={classes.btn}  onClick={(e)=>accepHandler(e,row)}><img className={classes.ico} src={acc}></img></a>
    
  ),
},
  
  ];


  return (

     <DataTable columns={columns} data={ctx.data} fixedHeader  conditionalRowStyles={ctx.conditionalRowStyles}   />
  )
}
