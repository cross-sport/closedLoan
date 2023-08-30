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
  { value: 'განადგურებული', label: 'განადგურებული' },
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
      selector: row => row.LoanId,
  },
    {
      name: 'სახელი და გვარი',
      width: "8rem" , 
      selector: row => row.ClientFullName,
  },
    {
      name: 'პირადი ნომერი',
      selector: row => row.PersonalNo,
  },
    {
      name: 'ხელშეკრულების N',
      width: "10rem" , 
      selector: row => row.AgreementNo,
  },
    {
      name: 'გაცემის თარიღი',
      selector: row => row.StartDate,
  },
    {
      name: 'დახურვის თარიღი',
      selector: row => row.CloseDate,
  },
    {
      name: 'ფილიალი',
      selector: row => row.ApplicationDept,
  },
  {
    name: "სტატუსი",
    width: "11rem" , 
    selector: row => row.Status,    
    cell: (row) => (
      <Select className={classes.select} options={options}
       styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderColor: state.isFocused ? '#06acee' : '#06acee',
          fontSize:state.isFocused ? '0.9rem' : '0.9rem',
          
        }),
      }} 
      menuPortalTarget={document.body}  defaultValue={{ label:`${row.Status || ''}`, value: row.Status }} onChange={(e) =>ctx.acceptData('Status',row,e.value) }/> //handleCheck(e,row)
    ),
    
},
  {
    name: "შეკვრის N",
    selector: row => row.packN,
    cell: (row) => (
    
      <input className={classes.input} type='text' placeholder="შეავსეთ ველი*" defaultValue={row.packN || ''} onChange={(e)=>ctx.acceptData('packN',row,e.target.value)}/>
    ),
},
  {
    name: "ყუთის N",
    selector: row => row.boxN,
    cell: (row) => (
      <input className={classes.input} type='text' defaultValue={row.boxN || ''} onChange={(e)=>ctx.acceptData('boxN',row,e.target.value)}/>
    ),
},
{
  selector:row=>row.toggleSelected,
  width: "4.5rem" ,
  cell: (row) => (
    <a href='submit' className={classes.btn}  onClick={(e)=>accepHandler(e,row)}><img className={classes.ico} src={acc} alt='accept'></img></a>
    
  ),
},
  
  ];

ctx.disableButtonChecker()  // send button disable function

  return (

     <DataTable columns={columns}  data={ctx.savedData} fixedHeader  conditionalRowStyles={ctx.conditionalRowStyles}   />
  )
}
