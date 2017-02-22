import React, { PropTypes, Component } from 'react';
import AccountsClient from '@accounts/client';
import FormTypes from './FormTypes';
import enhanceLogin from './enhanceLogin';

class Accounts extends Component {
  static propTypes = {
    formType: PropTypes.string,
    Login: PropTypes.node,
    Signup: PropTypes.node,
  }
  static defaultProps = {
    formType: FormTypes.LOGIN,
  }
  constructor(props) {
    super(props);
    this.state = {
      formType: this.props.formType,
    };
  }
  setFormType = (formType) => {
    this.setState({
      formType,
    });
  }
  render() {
    const {
      Login,
      Signup,
      ...otherProps
    } = this.props;
    let Form;
    switch (this.state.formType) {
      case FormTypes.LOGIN:
        Form = enhanceLogin(Login);
        break;
      default:
        break;
    }
    return <Form {...otherProps} />;
  }
}

AccountsClient.ui.Accounts = Accounts;
export default Accounts;
