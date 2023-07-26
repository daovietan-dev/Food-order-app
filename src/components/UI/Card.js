import React from 'react'
import classes from './Card.module.css'

const Card = props => {
  return <div className={classes.card}>{props.children}</div>
}

export default Card

// trong props có một thuộc tính là 'children' chứa tất cả các phần tử mà component đó bọc xung quanh
