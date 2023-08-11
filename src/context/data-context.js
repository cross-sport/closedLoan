import React from 'react'
import { useState } from 'react'

const DataContext =React.createContext ({
  sendData:[],
  updateData:(newData)=>{}
})

export default DataContext


export const DataContextProvider=(props)=>{
    const [sendData,setSendData]=useState([])
    
    const updateData=(newData)=>{
        console.log('newdata',newData);
        console.log('senddata',sendData);
        

        const existinItem=sendData.find(item=>{return item.loanId===newData.loanId})
        console.log(existinItem);
        
        if (!existinItem){
            setSendData((prevState)=>([...prevState,newData]));    
        } else {
                existinItem.loanId=newData.loanId
                existinItem.Status=newData.Status
                existinItem.packN=newData.packN
                existinItem.boxN=newData.boxN
        }
        
                   
    }

    return <DataContext.Provider value={{
        updateData:updateData,
        sendData:sendData
    }} >
        {props.children}
    </DataContext.Provider>    
}
