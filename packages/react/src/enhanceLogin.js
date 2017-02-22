import {
  compose,
  withHandlers,
  withProps,
  withState,
} from 'recompose';

const enhanceLogin = compose(
  withState('loginUserField', 'setLoginUserField', ''),
  withState('loginPasswordField', 'setLoginPasswordField', ''),
  withHandlers({
    loginWithPassword: props => (user, password) => {

    },
    onChangeLoginUserField: ({ setLoginUserField }) => (e) => {
      setLoginUserField(e.target.value);
    },
    onChangeLoginPasswordField: ({ setLoginPasswordField }) => (e) => {
      setLoginPasswordField(e.target.value);
    },
  }),
);

export default enhanceLogin;
