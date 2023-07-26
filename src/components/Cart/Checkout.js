import React, { useEffect } from 'react'
import classes from './Checkout.module.css'
import useInput from '../../hooks/use-input'

const Checkout = ({ checkoutHandle, onConfirm }) => {
  const {
    inputValue: nameValue,
    isValid: nameIsValid,
    isInvalid: nameIsInvalid,
    onChangeHandle: nameChangeHandle,
    onBlurHandle: nameBlurHandle,
    resetInput: resetName,
  } = useInput(inputValue => inputValue.trim() !== '')

  const {
    inputValue: streetValue,
    isValid: streetIsValid,
    isInvalid: streetIsInvalid,
    onChangeHandle: streetChangeHandle,
    onBlurHandle: streetBlurHandle,
    resetInput: resetStreet,
  } = useInput(inputValue => inputValue.trim() !== '')

  const {
    inputValue: postcodeValue,
    isValid: postcodeIsValid,
    isInvalid: postcodeIsInvalid,
    onChangeHandle: postcodeChangeHandle,
    onBlurHandle: postcodeBlurHandle,
    resetInput: resetPostcode,
  } = useInput(inputValue => inputValue.trim().length > 5)

  const {
    inputValue: cityValue,
    isValid: cityIsValid,
    isInvalid: cityIsInvalid,
    onChangeHandle: cityChangeHandle,
    onBlurHandle: cityBlurHandle,
    resetInput: resetCity,
  } = useInput(inputValue => inputValue.trim() !== '')

  let isFormInvalid = true

  if (nameIsValid && streetIsValid && postcodeIsValid && cityIsValid) {
    isFormInvalid = false
  }

  const submitHandle = event => {
    event.preventDefault()

    if (isFormInvalid) {
      nameBlurHandle()
      streetBlurHandle()
      postcodeBlurHandle()
      cityBlurHandle()
      return
    }

    onConfirm({
      name: nameValue,
      street: streetValue,
      postalCode: postcodeValue,
      city: cityValue,
    })
  }

  return (
    <form onSubmit={submitHandle}>
      <div
        className={`${classes[`control`]} ${
          nameIsInvalid ? classes.invalid : ''
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={nameValue}
          onChange={nameChangeHandle}
          onBlur={nameBlurHandle}
        />
        {nameIsInvalid && <span>name must not be empty</span>}
      </div>
      <div
        className={`${classes[`control`]} ${
          streetIsInvalid ? classes.invalid : ''
        }`}
      >
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          name="street"
          value={streetValue}
          onChange={streetChangeHandle}
          onBlur={streetBlurHandle}
        />
        {streetIsInvalid && <span>street must not be empty</span>}
      </div>
      <div
        className={`${classes[`control`]} ${
          postcodeIsInvalid ? classes.invalid : ''
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          name="postal code"
          value={postcodeValue}
          onChange={postcodeChangeHandle}
          onBlur={postcodeBlurHandle}
        />
        {postcodeIsInvalid && <span>postal code must more 5 characters</span>}
      </div>
      <div
        className={`${classes[`control`]} ${
          cityIsInvalid ? classes.invalid : ''
        }`}
      >
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          value={cityValue}
          onChange={cityChangeHandle}
          onBlur={cityBlurHandle}
        />
        {cityIsInvalid && <span>city must not be empty</span>}
      </div>
      <div className={classes.actions}>
        <button
          type="button"
          className={classes[`button--alt`]}
          onClick={checkoutHandle}
        >
          Cancel
        </button>
        {/* <button disabled={isFormInvalid}>Confirm</button> */}
        <button>Confirm</button>
      </div>
    </form>
  )
}

export default Checkout
