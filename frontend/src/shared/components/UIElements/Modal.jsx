import React from 'react'
import { motion } from 'framer-motion';

import ReactDOM from 'react-dom'
import Backdrop from './Backdrop'
import './Modal.css'

const ModalOverlay = (props) => {
    const content = (
      <motion.div
        className={`modal ${props.className}`}
        style={props.style}
        initial={{ opacity: 0, y: '-100vh' }}
        animate={{ opacity: 1, y: '0' }}
        exit={{ opacity: 0, y: '-100vh' }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <header className={`modal__header ${props.headerClass}`}>
          <h2>{props.header}</h2>
        </header>
        <form onSubmit={props.onSubmit ? props.onSubmit : (e) => e.preventDefault()}>
          <div className={`modal__content ${props.contentClass}`}>
            {props.children}
          </div>
          <footer className={`modal__footer ${props.footerClass}`}>
            {props.footer} {/* Render footer prop here */}
          </footer>
        </form>
      </motion.div>
    );
  
    return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
  };
  
const Modal = (props) => {
    if (!props.show) {
        return null;  
      }
  return <>
 <Backdrop onClick={props.onCancel} />
 <ModalOverlay {...props} />
  
  </>
}

export default Modal