import React from 'react'
import { useState } from 'react'


const DataContext =React.createContext ({
  acceptData:(column,row,value)=>{},
  savedData:[],
  colorHandler:()=>{},
  conditionalRowStyles:[],
  sendRequestHandler:()=>{},
  searcheButtonHandler:(a,b)=>{},
  disableButtonChecker:()=>{},
  disableButton:false
})

export default DataContext


export const DataContextProvider=(props)=>{
    const [savedData,setSavedData]=useState([])  // {LoanId , Status,packN,boxN,...}  data for send
    const [disableButton,setDisableButton]=useState(false)
   
    
  const acceptHandlerF =(column, row, value)=>{ 
    
    const existinItem=savedData.find(item=>{return item.LoanId===row.LoanId})
    if (!existinItem){
      setSavedData((prevState)=>([...prevState,Object.assign({LoanId:row.LoanId, [column]:column=value})]));
       } 
       else { 
                existinItem.LoanId=row.LoanId;
                existinItem[column]=value
            }
    colorHandler(row,false)          
    
  }
  
  const searcheNewdata= async (personalNo,agreementNo)=>{        
    console.log(personalNo,agreementNo);
    const response = await fetch(`http://localhost:5000/api?personalNo=${personalNo}&agreementNo=${agreementNo}`);
    const newData=await response.json();
   
    setSavedData(newData[0]) 
  }


//accept color

const colorHandler=(row,action)=>{
     console.log(savedData);
     
    const updatedData = savedData.map(item => {
      if (row.LoanId !== item.LoanId) {
        return item;
      } else 
    
      if(action) {
        return {...item,
          toggleSelected: !item.toggleSelected
        }
      }
      else {
        return {...item,
        toggleSelected: false
      }
      }
    });
    setSavedData(updatedData)
  }

  const disableButtonChecker=()=>{
    const counter=savedData.filter(el=>el.toggleSelected===true)
    counter.length>1?setDisableButton(true):setDisableButton(false)
  }

  const submitHandler=async()=>{
    const newData=await fetch('http://localhost:5000/update',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body:JSON.stringify(
        {savedData}
      )
    }).then(res=>res.json())
     console.log(newData);           
}

  const conditionalRowStyles = [
    {
      when: row => row.toggleSelected,
      style: {
        backgroundColor: "#e8fed5",
        userSelect: "none"
      }
    }];

    return <DataContext.Provider value={{
        acceptData:acceptHandlerF,
        savedData:savedData,
        colorHandler:colorHandler,
        conditionalRowStyles:conditionalRowStyles,
        sendRequestHandler:submitHandler,
        searcheButtonHandler:searcheNewdata,
        disableButtonChecker:disableButtonChecker,
        disableButton:disableButton
        
    }} >
        {props.children}
    </DataContext.Provider>    
}
