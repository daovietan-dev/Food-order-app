import React, { useContext, useEffect, useState } from 'react'
import classes from './HeaderButton.module.css'
import CartContext from '../../store/CartContext'

// Button sẽ gồm 3 elements tương ứng với biểu giỏ hàng, text, và số items trong giỏ hàng
// ban đầu chúng ta cứ thử thiết lập một giá trị cho số items trong giỏ hàng là 3. Sau này sẽ thay thế bằng logic code sau
const HeaderButton = ({ onShowModal }) => {
  const [buttonBump, setButtonBump] = useState(false)
  const { items } = useContext(CartContext)

  const numberOfItems = items.reduce(
    (currentAmount, item) => currentAmount + item.amount,
    0
  )

  // tạo hiệu ứng bump cho HeaderButton
  useEffect(() => {
    setButtonBump(true)

    const timer = setTimeout(() => {
      setButtonBump(false)
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [items])

  return (
    <button
      className={`${classes.button} ${buttonBump ? classes.bump : ``}`}
      onClick={onShowModal}
    >
      <span className={classes.icon}>
        <i className="fa-solid fa-cart-shopping"></i>
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  )
}

export default HeaderButton
