import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { AuthService } from '../../commons/authentication/authentication.service';
import { APP_STATES } from '../../routes';

export class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.signup = this.signup.bind(this);
  }
  
  signup(data) {
    this.setState({
      isLoading: true,
    });
    return AuthService.signUp(data)
      .then(() => this.props.history.replace(APP_STATES.DASHBOARD.path))
      .catch(({ errors = [] } = {}) => {
        this.setState({
          errors,
          isLoading: false,
        });
      });
  }

  render() {
    return (
      <div className="signup">
        <Form 
          onSubmit={this.signup}
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
            <Field name="username">
              {({ input }) => (
                <input
                  {...input}
                  type="text"
                  placeholder="Username"
                  name="username"
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
            <input type="submit" value="Créer mon compte" />
          </form>
        )}
      />
      </div>
    )
  }
}