import React from 'react';
import PropTypes from 'prop-types';
import { red500 } from 'material-ui/styles/colors';

const ErrorMessage = ({ children }) => (
  <div
    style={{
      marginTop: 20,
      color: red500,
      fontFamily: 'Roboto',
      textAlign: 'center',
    }}
  >
    {children}
  </div>
);

ErrorMessage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorMessage;
