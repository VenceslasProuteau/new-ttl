import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { APP_STATES } from './routes';
// import { Sidebar } from './modules/sidebar/Sidebar';
import { LoginPage } from './modules/login/login.page';
import { AuthService } from './commons/authentication/authentication.service';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      Object.values(APP_STATES).map((route, i) =>
        <Route
          key={i}
          path={route.path} 
          exact={route.exact}
          render={props =>
            <route.component {...props}/>
          }
        />
      )
    )
  }
}