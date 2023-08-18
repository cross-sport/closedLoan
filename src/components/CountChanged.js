import React from 'react'
import classes from './CountChanged.module.css'
import { useContext } from 'react'
import DataContext from '../context/data-context'


export const CountChanged = () => {
   const ctx=useContext(DataContext)
   console.log(ctx.cChangedData);
   
  return (
    <div className={classes.control}>
          <p>განახლებული სესხების რაოდენობა</p>
          <button onClick={ctx.countButtonHandler}>დათვლა</button>
          <input type='text' disabled={true} placeholder='რაოდენობა' value={ctx.cChangedData}/>
        </div>
  )
}
