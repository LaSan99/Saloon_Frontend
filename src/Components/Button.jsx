import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({
  children,
  variant = 'primary',
  className = '',
}) => {
  const baseStyles =
    'px-6 py-3 rounded-md font-medium transition-all duration-200 text-sm';
  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800',
    secondary: 'bg-white text-black border border-gray-200 hover:bg-gray-50',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary']),
  className: PropTypes.string,
};

Button.defaultProps = {
  variant: 'primary',
  className: '',
};
