import React from 'react';
import { AuthService } from './authentication.service';
import { APP_STATES } from '../../routes';

export const authentication = Component => (props) => {
  if (!AuthService.isAuthenticated()) {
    return props.history.replace(APP_STATES.LOGIN.path);
  }

  return <Component {...props} />
}