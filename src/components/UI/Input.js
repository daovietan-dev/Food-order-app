import React from 'react'
import classes from './Input.module.css'

const Input = ({ label, inputObj }) => {
  return (
    <div className={classes.input}>
      <label htmlFor={inputObj.id}>{label}</label>
      {/* inputObj = {type:..., name:..., value:..., id:...,...}
      đây là một trick chúng ta có thể học để viết code gọn hơn*/}
      <input {...inputObj} />
    </div>
  )
}

export default Input
