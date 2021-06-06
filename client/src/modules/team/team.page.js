import React from 'react';
import { Form, Field } from 'react-final-form';
import { FieldErrorMessage } from 'commons/forms/field-error.component';
import {
  composeValidators,
  required,
} from 'commons/forms/validators';
import classNames from 'classnames';
import { Spinner } from 'commons/spinner/spinner.component';
import { UserService } from 'commons/user/user.service';
import { TeamService } from './team.service';
import './team.scss';

export class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
    this.createTeam = this.createTeam.bind(this);
  }

  componentDidMount() {
    return UserService.getSelfUser()
      .then(({ team = {} } = {}) => {
        if (!team.id) {
          return this.setState({ isNotTeamMember: true, isLoading: false });
        }

        return TeamService.get(team.id)
          .then((team) => {
            this.setState({ team, isLoading: false });
          });
      });
  }

  createTeam(form) {
    this.setState({ isLoading: true });
    return TeamService.create(form)
      .then(({ id }) => TeamService.get(id)
        .then((team) => {
          this.setState({
            isLoading: false,
            isNotTeamMember: false,
            isCreationSuccessfull: true,
            team,
          });
        })).catch(({ error }) => this.setState({ error, isLoading: false }));
  }

  render() {
    return this.state.isLoading ? <Spinner /> : (
      <div className="page">
        <div className="page__header">
        <div className="page__header-col">
          Mon équipe
        </div>
        </div>
        <div className="page__content">
          <div className="team__block">
            {this.state.isNotTeamMember ? (
              <Form 
                onSubmit={this.createTeam}
                render={({
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit} autoComplete="off" className="form form--dark">
                    <Field name="name" validate={composeValidators(required)}>
                      {({ input }) => (
                        <input
                          {...input}
                          type="text"
                          placeholder="Nom de mon équipe"
                          name="name"
                        />
                      )}
                    </Field>
                    <div className="form-error-message">
                      <FieldErrorMessage
                        name="email"
                        when={['required']}
                        message="Un nom d'équipe est requis"
                      />
                      {/* {this.state.error && (
                        <span>{ERROR_MESSAGES[this.state.error]}</span>
                      )} */}
                    </div>
                    <button className="button" type="submit">
                      Créer mon équipe
                    </button>
                  </form>
                )}
              />
            ) : (
              <div>
                {this.state.team.name}
                {this.state.team.users.map(({ username, isOwner }) => (
                  <div>{username}{isOwner && (' (admin)')}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}