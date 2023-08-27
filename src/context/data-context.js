import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DataContext =React.createContext ({
  acceptData:(column,row,value)=>{},
  savedData:[],
  colorHandler:()=>{},
  conditionalRowStyles:[],
  sendRequestHandler:()=>{},
  searcheButtonHandler:(a,b)=>{},
  disableButtonChecker:()=>{},
  countButtonHandler:()=>{},
  cChangedData:[],
  countSecView:false,
  countSecViewHandler:()=>{},
  disableButton:false
})

export default DataContext


export const DataContextProvider=(props)=>{
    const [savedData,setSavedData]=useState([])  // {LoanId , Status,packN,boxN,...}  data for send
    const [cChangedData,setCChangedData]=useState([]) // get count of changed Status which not equal ' '
    const [countSecView,setCountSecView]=useState(false)// view button section view or hide
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
  
//accept color

const colorHandler=(row,action)=>{    
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
    counter.length>1||counter.length===0?setDisableButton(true):setDisableButton(false)
  }

  // changed status counter view
  const countSecViewHandler=(e)=>{
    e.preventDefault()    
    setCountSecView(!countSecView)
  }


  
  const countChanged = async () => {
    try {
      // const response = await axios.get('http://localhost:5000/count');
      const response = await axios.get('http://10.118.27.80:5000/count');
  
      const countData = response.data;
      setCChangedData(countData[0]);
    } catch (error) {
      // Handle error here
      console.error('Error fetching count data:', error);
    }
  };


  const searcheNewdata = async (personalNo, agreementNo) => {
    try {
      const response = await axios.get(`http://10.118.27.80:5000/api`, {
        params: {
          personalNo: personalNo,
          agreementNo: agreementNo,
        },
      });
  
      const newData = response.data;
      setSavedData(newData[0]);
    } catch (error) {
      // Handle error here
      console.error('Error fetching data:', error);
    }
  };

const submitHandler = (e) => {
  
    savedData.map(async loan=>{
      console.log(loan);
      
      if(loan.toggleSelected===true){        
        try {
    const response = await axios.post('http://10.118.27.80:5000/update', loan);
    const newData = response.data;    
    console.log('statusi : ',newData);
  
           // Show success toast
      toast.success('წარმატებით შესრულდა', {
        position: 'top-right',
        autoClose: 3000, // 3 seconds
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log('test');
      
      setSavedData([])
  } catch (error) {
    // Handle error here
    console.error('Error submitting data:', error);
    toast.error('დაფიქსირდა შეცდომა', {
      position: 'top-right',
      autoClose: 5000, // 5 seconds
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } } })
};


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
        countButtonHandler:countChanged,
        cChangedData:cChangedData,
        countSecView:countSecView,
        countSecViewHandler:countSecViewHandler,
        disableButton:disableButton
        
    }} >
        {props.children}
    </DataContext.Provider>    
}
