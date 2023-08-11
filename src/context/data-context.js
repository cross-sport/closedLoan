import React from 'react'
import { useState } from 'react'

const dataMain=[
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
        Status:"naw",
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
        Status:"naw",
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
        Status:"naw",
        toggleSelected:false
      
  },
      {
        LoanID:5778,
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
        Status:"naw",
        toggleSelected:false
      
  }]

const DataContext =React.createContext ({
    data:[],
  acceptData:(column,row,value)=>{},
  savedData:[],
  colorHandler:()=>{},
  conditionalRowStyles:[]
})

export default DataContext


export const DataContextProvider=(props)=>{
    const [savedData,setSavedData]=useState([])  // {id , status,packN,boxN}
    const [data,setData]=useState(dataMain)
    
   

    
    
  const acceptHandlerF =(column, row, value)=>{
    
    const existinItem=savedData.find(item=>{return item.id===row.LoanID})
    if (!existinItem){
      setSavedData((prevState)=>([...prevState,Object.assign({id:row.LoanID, [column]:column=value})]));
       } 
       else { 
                existinItem.id=row.LoanID;
                existinItem[column]=value
            }

       colorHandler(row,false)
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

    return <DataContext.Provider value={{
        acceptData:acceptHandlerF,
        savedData:savedData,
        colorHandler:colorHandler,
        conditionalRowStyles:conditionalRowStyles,
        data:data

    }} >
        {props.children}
    </DataContext.Provider>    
}
