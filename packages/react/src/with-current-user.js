/* eslint-disable react/no-did-mount-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WithCurrentUser extends Component {
  constructor(props, context) {
    super(props);
    const user = context.accountsClient.user();
    const loading = context.accountsClient.getState().get('isLoading');
    this.state = {
      user,
      loading,
    };
  }

  componentDidMount() {
    const { accountsClient } = this.context;
    this.unsubscribe = this.context.accountsClient.store.subscribe(() => {
      const user = accountsClient.user();
      const loading = accountsClient.getState().get('isLoading');
      this.setState({ user, loading });
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    return React.cloneElement(this.props.children, {
      currentUser: this.state.user,
      loading: this.state.loading,
    });
  }
}

WithCurrentUser.propTypes = {
  children: PropTypes.node.isRequired,
};

WithCurrentUser.contextTypes = {
  accountsClient: PropTypes.object,
};

// eslint-disable-next-line no-shadow
const withCurrentUser = Component => props => (
  <WithCurrentUser>
    <Component {...props} />
  </WithCurrentUser>
);

export default withCurrentUser;
