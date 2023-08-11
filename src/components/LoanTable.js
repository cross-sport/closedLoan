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

 
  const [savedData,setSavedData]=useState([])  // {id , status,packN,boxN}
  const [data,setData]=useState(props.loans)

  const acceptHandlerF =(column, row, value)=>{
    console.log("column    ",column);
    console.log("value    ",value);
    
    const existinItem=savedData.find(item=>{return item.id===row.LoanID})
   
    
    // const existinItemId=savedDataTest.indexOf(existinItem)
    if (!existinItem){
      setSavedData((prevState)=>([...prevState,Object.assign({id:row.LoanID, [column]:column=value})]));
       } 
       else { 
                existinItem.id=row.LoanID;
                existinItem[column]=value
            }

       colorHandler(row,false)
  }
 
   
//   const handleCheck = (e, row) => {
//     // setSavedData({id:row.LoanID,value:e.value})
//     // setSavedData((prevState)=>({id:row.LoanID,status:e.value,packN:prevState.packN,boxN:prevState.boxN}))
//     const existinItem=savedData.find(item=>{return item.id===row.LoanID})
//     const existinItemId=savedData.indexOf(existinItem)
//     console.log('id',existinItemId);
//     if (!existinItem){
//       setSavedData((prevState)=>([...prevState,{id:row.LoanID,status:e.value}]));
//        } 
//        else { 
//                 existinItem.id=row.LoanID;
//                 existinItem.status=e.value;
               
//        }
    
//     colorHandler(row,false)
     
//  };
// const handlePackN=(e,row)=>{

//   const existinItem=savedData.find(item=>{return item.id===row.LoanID})
//     const existinItemId=savedData.indexOf(existinItem)
//     console.log('id',existinItemId);
//     if (!existinItem){
//       setSavedData((prevState)=>([...prevState,{id:row.LoanID,packN:e.target.value}]));
//        } 
//        else {   
//                 existinItem.id=row.LoanID;
//                 existinItem.packN=e.target.value;
                
//        }

// colorHandler(row,false)
// }


// const handleBoxN=(e,row)=>{
//   const existinItem=savedData.find(item=>{return item.id===row.LoanID})
//     const existinItemId=savedData.indexOf(existinItem)
//     console.log('id',existinItemId);
//     if (!existinItem){
//       setSavedData((prevState)=>([...prevState,{id:row.LoanID,boxN:e.target.value}]));
//        } 
//        else {   existinItem.id=row.LoanID;
//                 existinItem.boxN=e.target.value;     
//        }

//   colorHandler(row,false)
// }
  
// accept
const accepHandler=(e,row)=>{
 e.preventDefault()
 
 console.log('save',savedData);

 
 // დაექსეპტებული ობჯექტი
 //შესასწორებელი

 
//  ctx.updateData(accptInfo)
 colorHandler(row,true)
 
 
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
      <Select className={classes.select} options={options} onChange={(e) =>acceptHandlerF('status',row,e.value) }/> //handleCheck(e,row)
    ),
    
},
  {
    name: "შეკვრის N",
    
    cell: (row) => (
    
      <input className={classes.input} type='text' onChange={(e)=>acceptHandlerF('packN',row,e.target.value)}/>
    ),
},
  {
    name: "ყუთის N",
    
    cell: (row) => (
      <input className={classes.input} type='text' onChange={(e)=>acceptHandlerF('boxN',row,e.target.value)}/>
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
