import React from 'react';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';
import './Backdrop.css';

const Backdrop = ({ onClick }) => {
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return ReactDOM.createPortal(
    <motion.div
      className="backdrop"
      onClick={onClick}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={backdropVariants}
      transition={{ duration: 0.3 }}
    />,
    document.getElementById('backdrop-hook')
  );
};

export default Backdrop;
