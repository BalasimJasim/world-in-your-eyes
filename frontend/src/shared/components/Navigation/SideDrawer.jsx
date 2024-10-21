import React from 'react';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';
import './SideDrawer.css';

const SideDrawer = ({ children, onClose }) => {
  const variants = {
    hidden: { x: '-100%' },
    visible: { x: 0 },
    exit: { x: '-100%' },
  };

  return ReactDOM.createPortal(
    <motion.aside onClick={onClose}
      className="side-drawer"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <button className="close-btn"  aria-label="Close Drawer">
        &times;
      </button>
      {children}
    </motion.aside>,
    document.getElementById('drawer-hook')
  );
};

export default SideDrawer;
