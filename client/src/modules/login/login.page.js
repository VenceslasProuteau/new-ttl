import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import qs from 'query-string';
import { Spinner } from '../../commons/spinner/spinner.component';
import { FieldErrorMessage } from '../../commons/forms/field-error.component';
import {
  composeValidators,
  pattern,
  required,
  passwordMinLength,
  EMAIL_PATTERN
} from '../../commons/forms/validators';
import { AuthService } from '../../commons/authentication/authentication.service';
import { APP_STATES } from '../../routes';
import './login.scss';

const ERROR_MESSAGES = {
  NOT_EXISTING_USER: "L'email renseigné n'existe pas",
  INVALID_PASSWORD: "Le mot de passe renseigné est incorrect"
}

export class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.redirectUrl = qs.parse(props.location.search).redirectUrl;
    this.onLogin = this.onLogin.bind(this);
    this.state = {
      error: false,
    };
  }
  
  onLogin(data) {
    this.setState({ isLoading: true });
    return AuthService.login(data)
      .then(() => {
        if (!this.redirectUrl) {
          return this.props.history.replace(APP_STATES.DASHBOARD.path);
        }
        window.location.href = `${window.location.origin}${this.redirectUrl}`;
      }).catch(({ error }) => this.setState({ error, isLoading: false }));
  }

  render() {
    return this.state.isLoading ? <Spinner /> : (
      <div className="login">
        <Form 
          onSubmit={this.onLogin}
          render={({
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit} autoComplete="off">
              <Field name="email" validate={composeValidators(required, pattern(EMAIL_PATTERN))}>
                {({ input }) => (
                  <input
                    {...input}
                    type="email"
                    placeholder="Email"
                    name="email"
                  />
                )}
              </Field>
              <Field name="password" validate={composeValidators(required, passwordMinLength)}>
                {({ input }) => (
                  <input
                    {...input}
                    type="password"
                    placeholder="Mot de passe"
                    name="password"
                  />
                )}
              </Field>
              <div className="form-error-message">
                <FieldErrorMessage
                  name="email"
                  when={['required']}
                  message="L'email est requis"
                />
                <FieldErrorMessage
                  name="email"
                  when={['pattern']}
                  message="Le format de l'email renseigné est incorrect"
                />
                <FieldErrorMessage
                  name="password"
                  when={['required']}
                  message="Le mot de passe est requis"
                />
                <FieldErrorMessage
                  name="password"
                  when={['passwordLength']}
                  message="Le mot de passe doit faire au moins 9 chiffres ou caractères"
                />
                {this.state.error && (
                  <span>{ERROR_MESSAGES[this.state.error]}</span>
                )}
              </div>
              <button className="button" type="submit">
                Se connecter
              </button>
          </form>
          )}
        />
      </div>
    )
  }
}