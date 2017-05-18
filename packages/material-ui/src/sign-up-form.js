import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Layout from './layout';
import ErrorMessage from './error-message';

class SignUpForm extends Component {
  state = {
    form: {
      username: '',
      email: '',
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
    // TODO validation with accountsClient
    // TODO if errors print
    try {
      await accountsClient.createUser({
        username: form.username,
        email: form.email,
        password: form.password,
      });
      // TODO redirect
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

  handleLogin = (e) => {
    e.preventDefault();
    const { accountsClient } = this.context;
    accountsClient.changeRoute(accountsClient.options.loginPath);
  };

  renderError = (name) => {
    const { errors } = this.state;
    return errors[name];
  };

  render() {
    const { form, formError } = this.state;
    const { passwordSignupFields } = this.context.accountsClient.options;
    return (
      <Layout>
        <form onSubmit={this.handleSubmit}>
          {(passwordSignupFields === 'USERNAME_ONLY' ||
            passwordSignupFields === 'USERNAME_AND_EMAIL' ||
            passwordSignupFields === 'USERNAME_AND_OPTIONAL_EMAIL') &&
            <TextField
              fullWidth
              floatingLabelText="Username"
              name="username"
              value={form.username}
              onChange={this.handleInputChange}
              errorText={this.renderError('username')}
            />}
          {(passwordSignupFields === 'EMAIL_ONLY' ||
            passwordSignupFields === 'USERNAME_AND_EMAIL' ||
            passwordSignupFields === 'USERNAME_AND_OPTIONAL_EMAIL') &&
            <TextField
              fullWidth
              floatingLabelText="Email"
              name="email"
              value={form.email}
              onChange={this.handleInputChange}
              errorText={this.renderError('email')}
            />}
          <TextField
            fullWidth
            floatingLabelText="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={this.handleInputChange}
            errorText={this.renderError('password')}
          />
          <RaisedButton primary label="Sign up" type="submit" />
          {formError && <ErrorMessage>{formError}</ErrorMessage>}

          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <a href="" onClick={this.handleLogin}>Already have an account?</a>
          </div>
        </form>
      </Layout>
    );
  }
}

SignUpForm.contextTypes = {
  accountsClient: PropTypes.object,
};

export default SignUpForm;
