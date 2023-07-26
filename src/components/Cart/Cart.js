import React, { useContext, useState } from 'react'
import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import useHttp from '../../hooks/use-http'
import CartItem from './CartItem'
import CartContext from '../../store/CartContext'
import Checkout from './Checkout'

// hiển thị danh sách meal trong giỏ hàng
const Cart = ({ onCloseModal }) => {
  const [isCheckout, setIsCheckout] = useState(false)
  const [didSendOrder, setDidSendOrder] = useState(false)
  const { items, totalAmount, addItem, removeItem, clearCart } =
    useContext(CartContext)
  const { sendRequest, isLoading } = useHttp()

  const hasItem = items.length !== 0

  const checkoutHandle = () => {
    setIsCheckout(preState => !preState)
  }

  const submitOrderHandle = async userData => {
    await sendRequest({
      url: `https://food-order-c9446-default-rtdb.firebaseio.com/orders.json`,
      method: `post`,
      body: {
        user: userData,
        orderItems: items,
      },
    })
    setDidSendOrder(true)
    clearCart()
  }

  console.log(didSendOrder)

  const itemList = (
    <ul className={classes[`cart-items`]}>
      {items.map(item => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={addItem.bind(null, { ...item, amount: 1 })}
          onRemove={removeItem.bind(null, item.id)}
        />
      ))}
    </ul>
  )

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes[`button--alt`]} onClick={onCloseModal}>
        Close
      </button>

      {hasItem && (
        <button className={classes.button} onClick={checkoutHandle}>
          Order
        </button>
      )}
    </div>
  )

  const modalContents = (
    <>
      {itemList}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{`$${totalAmount.toFixed(2)}`}</span>
      </div>
      {isCheckout ? (
        <Checkout
          checkoutHandle={checkoutHandle}
          onConfirm={submitOrderHandle}
        />
      ) : (
        modalActions
      )}
    </>
  )

  return (
    <Modal onCloseModal={onCloseModal}>
      {!isLoading && !didSendOrder && modalContents}
      {isLoading && <p className={classes.loading}>Sending order data...</p>}
      {!isLoading && didSendOrder && (
        <div className={classes.successful}>
          <p>Successfully sent the order!</p>
          <button onClick={onCloseModal}>Close</button>
        </div>
      )}
    </Modal>
  )
}

export default Cart
