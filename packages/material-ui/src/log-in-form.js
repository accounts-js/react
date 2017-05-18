import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { validate } from '@accounts/client';
import Layout from './layout';
import ErrorMessage from './error-message';

class LogInForm extends Component {
  state = {
    form: {
      user: '',
      password: '',
    },
    errors: {},
    formError: null,
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { accountsClient } = this.context;
    const { form } = this.state;
    this.setState({ formError: null, errors: {} });
    const errors = validate.logIn(accountsClient, form);
    if (errors) {
      this.setState({ errors });
      return;
    }
    try {
      await accountsClient.loginWithPassword(form.user, form.password);
      accountsClient.changeRoute(accountsClient.options.homePath);
    } catch (err) {
      this.setState({
        formError: err.message,
      });
    }
  };

  handleInputChange = ({ target }) => {
    this.setState(({ form }) => {
      form[target.name] = target.value;
      return { form };
    });
  };

  handleCreateAccount = (e) => {
    e.preventDefault();
    const { accountsClient } = this.context;
    accountsClient.changeRoute(accountsClient.options.signUpPath);
  };

  renderError = (name) => {
    const { errors } = this.state;
    return errors[name];
  };

  render() {
    const { form, formError } = this.state;
    return (
      <Layout>
        <form onSubmit={this.handleSubmit}>
          <TextField
            fullWidth
            floatingLabelText="Username or email"
            name="user"
            value={form.user}
            onChange={this.handleInputChange}
            errorText={this.renderError('user')}
          />
          <TextField
            fullWidth
            floatingLabelText="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={this.handleInputChange}
            errorText={this.renderError('password')}
          />
          <RaisedButton primary label="Login" type="submit" />
          {formError && <ErrorMessage>{formError}</ErrorMessage>}

          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <a href="" onClick={this.handleCreateAccount}>Create account</a>
          </div>
        </form>
      </Layout>
    );
  }
}

LogInForm.contextTypes = {
  accountsClient: PropTypes.object,
};

export default LogInForm;
