import React, { useRef, useState } from 'react'
import classes from './MealItemForm.module.css'
import Input from '../../UI/Input'

const MealItemForm = ({ id, addItemHandle }) => {
  const inputRef = useRef()

  const submitHandle = event => {
    event.preventDefault()

    const enteredAmount = +inputRef.current.value
    addItemHandle(enteredAmount)
  }

  return (
    <form className={classes.form} onSubmit={submitHandle}>
      <Input
        label={`Amount`}
        inputObj={{
          id: `${id}`,
          type: `number`,
          min: 1,
          max: 5,
          step: 1,
          defaultValue: 1,
          ref: inputRef,
        }}
      />
      <button>+ Add</button>
    </form>
  )
}

export default MealItemForm
