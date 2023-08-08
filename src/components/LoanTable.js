import React from 'react'
import DataTable from 'react-data-table-component';
import Select from 'react-select'
import classes from './LoanTable.module.css'

const options = [
  { value: 'მიღებული', label: 'მიღებული' },
  { value: 'ნაწილობრივ მიღებული', label: 'ნაწილობრივ მიღებული' },
]


export const LoanTable = (props) => {
   
  const handleCheck = (e, row) => {
    console.log(e, row);
};
  
  
  
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
}
  ];

  const data = props.loans
  return (

     <DataTable columns={columns} data={data} 
    
    />
  )
}
