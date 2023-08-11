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
        console.log(newData);
        
        setSendData((prevState)=>([...prevState,newData]));               
    }

    return <DataContext.Provider value={{
        updateData:updateData,
        sendData:sendData
    }} >
        {props.children}
    </DataContext.Provider>    
}
