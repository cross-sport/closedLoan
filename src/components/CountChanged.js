import React from 'react'
import classes from './CountChanged.module.css'
import { useContext,useRef } from 'react'
import DataContext from '../context/data-context'


export const CountChanged = () => {
  const packNumberRef=useRef('')
   const ctx=useContext(DataContext)

   const searchButtonHandler=(e)=>{
    e.preventDefault();
     ctx.countSelectedPackHandler(packNumberRef.current.value)
   }
   
   
   
   
  return (
    <div className={classes.controlContainer}>
      <div className={classes.control}>
          <p>განახლებული სესხების რაოდენობა</p>
          <input type='text' disabled={true} placeholder='რაოდენობა' value={ctx.cChangedData}/>
          <button onClick={ctx.countButtonHandler}>დათვლა</button>
        </div>
        <div className={classes.control}>
          <p>აღნიშნულ შეკვრაში საბუთების რაოდენობა</p>
          <input type='text' disabled={true} placeholder='რაოდენობა' value={ctx.selectedPackCount}/>
          <input type='text' placeholder='ყუთის N' ref={packNumberRef} />
          <button onClick={searchButtonHandler}>დათვლა</button>
        </div>
    </div>
    
        
  )
}
