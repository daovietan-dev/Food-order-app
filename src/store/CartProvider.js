import React, { useReducer } from 'react'
import CartContext from './CartContext'

const reducer = (state, action) => {
  switch (action.type) {
    case `add`: {
      const updatedTotalAmount =
        state.totalAmount + action.item.amount * action.item.price

      let updatedItems = []

      const exitsIndex = state.items.findIndex(
        item => item.id === action.item.id
      )
      const exitsItem = [...state.items][exitsIndex]

      if (exitsItem) {
        updatedItems = [...state.items]

        exitsItem.amount += action.item.amount

        updatedItems[exitsIndex] = exitsItem
      } else {
        updatedItems = state.items.concat(action.item)
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      }
    }
    case `remove`: {
      let updatedItems = []

      const exitsIndex = state.items.findIndex(item => item.id === action.id)
      const exitsItem = [...state.items][exitsIndex]

      if (exitsItem.amount === 1) {
        updatedItems = [...state.items]

        updatedItems.splice(exitsIndex, 1)
      } else {
        updatedItems = [...state.items]

        exitsItem.amount -= 1

        updatedItems[exitsIndex] = exitsItem
      }

      const updatedTotalAmount = state.totalAmount - exitsItem.price

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      }
    }
    case `clear`: {
      return {
        items: [],
        totalAmount: 0,
      }
    }

    default:
      throw new Error('Unknown action: ' + action.type)
  }
}

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(reducer, { items: [], totalAmount: 0 })

  const addItemHandle = item => {
    dispatch({
      type: `add`,
      item: item,
    })
  }

  const removeItemHandle = idItem => {
    dispatch({
      type: `remove`,
      id: idItem,
    })
  }

  const clearCartHandle = () => {
    dispatch({
      type: `clear`,
    })
  }

  const cartContext = {
    items: cart.items,
    totalAmount: cart.totalAmount,
    addItem: addItemHandle,
    removeItem: removeItemHandle,
    clearCart: clearCartHandle,
  }

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  )
}

export default CartProvider
