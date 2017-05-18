import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AccountsProvider extends Component {
  getChildContext() {
    return { accountsClient: this.props.accountsClient };
  }

  render() {
    return this.props.children;
  }
}

AccountsProvider.propTypes = {
  accountsClient: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

AccountsProvider.childContextTypes = {
  accountsClient: PropTypes.object.isRequired,
};

export default AccountsProvider;
