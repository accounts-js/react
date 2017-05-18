import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';

const Layout = ({ children }) => (
  <Paper style={{ margin: 'auto', maxWidth: 400, marginTop: 50, padding: 20 }}>
    {children}
  </Paper>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
