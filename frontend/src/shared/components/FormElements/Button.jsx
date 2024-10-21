import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

const Button = ({ href, to, exact, size, inverse, danger, type, onClick, disabled, children }) => {
  const buttonClass = `button button--${size || 'default'} ${inverse ? 'button--inverse' : ''} ${danger ? 'button--danger' : ''}`;

  if (href) {
    return (
      <a className={buttonClass} href={href}>
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <Link className={buttonClass} to={to} exact={exact}>
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonClass} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
