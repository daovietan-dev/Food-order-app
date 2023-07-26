import React from 'react'
import classes from './Modal.module.css'
import { createPortal } from 'react-dom'

const Backdrop = ({ onCloseModal }) => {
  return <div className={classes.backdrop} onClick={onCloseModal}></div>
}

const ModalOverlay = ({ children }) => {
  return <div className={classes.modal}>{children}</div>
}

const portalElement = document.getElementById(`overlays`)

const Modal = props => {
  return createPortal(
    <>
      <Backdrop onCloseModal={props.onCloseModal} />
      <ModalOverlay children={props.children} />
    </>,
    portalElement
  )
}

export default Modal
