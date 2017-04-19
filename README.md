# @accounts/react

## Note

This package is under active development.

## Install

```
yarn add @accounts/react
yarn add @accounts/client
yarn add @accounts/rest-client
yarn add @accounts/react-material-ui
```

## Usage

This is a simple example with react-router.

```javascript
import AccountsClient from '@accounts/client';
import restClient from '@accounts/rest-client';
import { accountRoutes, Authenticate, withCurrentUser } from '@accounts/react';

// If you want the material-ui view
import Accounts from '@accounts/react-material-ui';

// Setup client config and try to resume session to know if user is logged
(async () => {
  await AccountsClient.config({
    server: 'http://localhost:3010',
    history: browserHistory,
    title: 'express-rest',
    loginPath: '/login',
    signUpPath: '/signup',
    homePath: '/',
    reduxLogger: createLogger(),
    passwordSignupFields: 'USERNAME_AND_EMAIL',
  }, new RestClient({
    apiHost: 'http://localhost:3010',
    rootPath: '/accounts',
  }));

  await AccountsClient.resumeSession();
})();

// The withUser hoc pass a user prop to the component
const Home = withCurrentUser(AccountsClient)(({ currentUser }) =>
  <div>
    Signed in user info
    <br />
    {Object.keys(currentUser).map(key => <div key={key}>{key} : {currentUser[key]} </div>)}
  </div>,
);

// Use the Authenticated component in the router will check if a user is logged and redirect to /login if not
render((
  <MuiThemeProvider>
    <Router history={browserHistory}>
      <Route path="/" component={({ children }) =>
          <Authenticate
            accounts={AccountsClient}
            Loading={Loading}
            Dialog={Accounts}
          >
            {children}
          </Authenticate>}
        >
        <IndexRoute component={Home} />
        <Route path="/home" component={Home} />
        {accountRoutes({
          accounts: AccountsClient,
          component: Accounts,
          container: ({ children }) =>
          (
            <div
              style={{
                height: '85vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              {children}
            </div>
          ),
        })}
      </Route>
    </Router>
  </MuiThemeProvider>
), document.getElementById('root'));
```
