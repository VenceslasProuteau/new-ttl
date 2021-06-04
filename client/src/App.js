import React from 'react';
import classNames from 'classnames';
import { Route } from 'react-router-dom';
import { AuthService } from 'commons/authentication/authentication.service';
import { Sidebar } from 'commons/sidebar/sidebar.component';
import { APP_STATES } from './routes';

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
          render={(props) =>
            <div className={classNames('app-layout', { 'app-layout--extended':  !AuthService.isAuthenticated() })}>
              {AuthService.isAuthenticated() && (
                <Sidebar />
              )}
              <route.component {...props}/>
            </div>
          }
        />
      )
    )
  }
}