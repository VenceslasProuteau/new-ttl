import React from 'react';
import { AuthService } from './authentication.service';
import { APP_STATES } from '../../routes';
import '../../app.scss';

export const withAuth = Component => (props) => {
  if (!AuthService.isAuthenticated()) {
    props.history.replace({
      pathname: APP_STATES.LOGIN.path,
      search: `?redirectUrl=${props.location.pathname}`,
    });
    return null;
  }

  return (
    <React.Fragment>
      <div className="app__menu-toggle"></div>
      {/* <Sidebar /> */}
      <div className="app">
        <div className="layout-container">
          <Component {...props} />
        </div>
      </div>
    </React.Fragment>
  )
}