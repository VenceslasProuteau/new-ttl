import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { AuthService } from '../../commons/authentication/authentication.service';
import { APP_STATES } from '../../routes';

export class LoginPage extends Component {
  constructor(props) {
    super(props);
  }
  
  onLogin(data) {
    return AuthService.login(data)
      .then(() => this.props.history.replace(APP_STATES.DASHBOARD.path))
      .catch((err) => console.log('err'));
  }

  render() {
    return (
      <div className="login">
        <Form 
        onSubmit={this.onLogin}
        render={({
          handleSubmit,
        }) => (
        <form onSubmit={handleSubmit} autoComplete="off">
          <Field name="email">
            {({ input }) => (
              <input
                {...input}
                type="email"
                placeholder="Email"
                name="email"
              />
            )}
          </Field>
          <Field name="password">
            {({ input }) => (
              <input
                {...input}
                type="password"
                placeholder="Mot de passe"
                name="password"
              />
            )}
          </Field>
          <input type="submit" label="Se connecter"/>
      </form>
      )} />
      </div>
    )
  }
}