import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { Spinner } from 'commons/spinner/spinner.component';
import {
  composeValidators,
  pattern,
  required,
  passwordMinLength,
  EMAIL_PATTERN
} from 'commons/forms/validators';
import { FieldErrorMessage } from 'commons/forms/field-error.component';
import { AuthService } from 'commons/authentication/authentication.service';
import { APP_STATES } from 'app/routes';
import '../login/login.scss';

const ERROR_MESSAGES = {
  USER_EXISTING: "Un compte est déjà enregistré avec cet email",
  TECHNICAL_ERROR: "Une erreur est survenue, merci de réessayer"
}

export class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.state = { isLoading: false };
  }
  
  signup(form) {
    this.setState({
      isLoading: true,
      form,
    });
    return AuthService.signUp(form)
      .then(() => {
        this.setState({ isAccountCreated: true, isLoading: false });
      }).catch(({ error = 'TECHNICAL_ERROR' } = {}) => {
        this.setState({
          error,
          isLoading: false,
        });
      });
  }

  login() {
    this.setState({ isLoading: true });
    return AuthService.login(this.state.form)
      .then(() => {
        this.props.history.replace(APP_STATES.DASHBOARD.path);
      });
  }

  render() {
    return this.state.isLoading ? <Spinner /> : (
      <div className="authent-page">
        <div className="authent-page__form-container">
          <Form 
            onSubmit={this.signup}
            render={({
              handleSubmit,
            }) => !this.state.isAccountCreated ? (
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
                  <Field name="username" validate={composeValidators(required)}>
                    {({ input }) => (
                      <input
                        {...input}
                        type="text"
                        placeholder="Username"
                        name="username"
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
                      message="Le mot de passe doit faire au moins 9 caractères"
                    />
                    {this.state.error && (
                      <span>{ERROR_MESSAGES[this.state.error]}</span>
                    )}
                  </div>
                  <button type="submit">
                    Rejoindre la communauté
                  </button>
                </form>
            ) : (
              <React.Fragment>
                <div className="authent-page__account-created">
                  Bienvenue dans la commu {this.state.form.username} !
                </div>
                <button onClick={this.login}>
                  Se connecter
                </button>
              </React.Fragment>
            )}
          />
        </div>
      </div>
    )
  }
}