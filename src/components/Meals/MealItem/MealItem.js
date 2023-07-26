import React, { useContext } from 'react'
import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm'
import CartContext from '../../../store/CartContext'

const MealItem = ({ id, name, description, price }) => {
  const { addItem } = useContext(CartContext)

  const addItemHandle = amount => {
    addItem({ id: id, name: name, price: price, amount: amount })
  }

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{`$${price.toFixed(2)}`}</div>
      </div>
      <div>
        <MealItemForm id={id} addItemHandle={addItemHandle} />
      </div>
    </li>
  )
}

export default MealItem
