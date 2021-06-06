import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import qs from 'query-string';
import { Spinner } from 'commons/spinner/spinner.component';
import { FieldErrorMessage } from 'commons/forms/field-error.component';
import {
  composeValidators,
  pattern,
  required,
  EMAIL_PATTERN
} from 'commons/forms/validators';
import { AuthService } from 'commons/authentication/authentication.service';
import { UserService } from 'commons/user/user.service';
import { APP_STATES } from 'app/routes';
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
        return UserService.getSelfUser()
          .then(() => {
            if (!this.redirectUrl) {
              return this.props.history.replace(APP_STATES.HOME.path);
            }
            window.location.href = `${window.location.origin}${this.redirectUrl}`;
          });
      }).catch(({ error }) => this.setState({ error, isLoading: false }));
  }

  render() {
    return this.state.isLoading ? <Spinner /> : (
      <div className="authent-page">
        <div className="authent-page__form-container">
          <Form
            onSubmit={this.onLogin}
            render={({
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit} autoComplete="off" className="form">
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
                <Field name="password" validate={composeValidators(required)}>
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
                  {this.state.error && (
                    <span>{ERROR_MESSAGES[this.state.error]}</span>
                  )}
                </div>
                <button className="button" type="submit">
                  Se connecter
                </button>
                <div className="authent-page__signup">
                  Vous n'avez pas encore de compte ? <Link to="/signup" className="page__inlined-link">Rejoignez notre communauté dès maintenant !</Link>
                </div>
              </form>
            )}
          />
        </div>
      </div>
    )
  }
}