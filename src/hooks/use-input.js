import { useState } from 'react'

const useInput = validateFunc => {
  const [inputValue, setInputValue] = useState('')
  const [isTouched, setIsTouched] = useState(false)

  const isValid = validateFunc(inputValue)
  const isInvalid = !isValid && isTouched

  const onChangeHandle = event => {
    setInputValue(event.target.value)
    setIsTouched(true)
  }

  const onBlurHandle = event => {
    setIsTouched(true)
  }

  const resetInput = () => {
    setInputValue('')
    setIsTouched(false)
  }

  return {
    inputValue,
    isValid,
    isInvalid,
    onChangeHandle,
    onBlurHandle,
    resetInput,
  }
}

export default useInput
