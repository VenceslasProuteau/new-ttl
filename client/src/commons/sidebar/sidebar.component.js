import React from 'react';
import {withRouter, NavLink} from 'react-router-dom';
import classNames from 'classnames';

import { AuthService } from 'commons/authentication/authentication.service';
import { UserService } from 'commons/user/user.service';
import { Spinner } from 'commons/spinner/spinner.component';
import { APP_STATES } from 'app/routes';
import './sidebar.scss';

class SidebarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isMenuToggled: false,
    }
    this.toggleMenu = this.toggleMenu.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    UserService.getSelfUser()
      .then((user) => {
        this.setState({
          user,
          isLoading: false,
        });
      });
  }

  toggleMenu() {
    this.setState({
      isMenuToggled: !this.state.isMenuToggled,
    });
  }

  logout() {
    AuthService.logout();
    return this.props.history.replace(APP_STATES.LOGIN.path);
  }
  
  render() {
    return this.state.isLoading
    ? <Spinner />
    : (
      <React.Fragment>
        <div className="sidebar__toggle-menu" onClick={this.toggleMenu}></div>
        <div className={classNames('sidebar', { 'sidebar--toggled': this.state.isMenuToggled })}>
          <div className="sidebar__user-card">
            <div className="sidebar__close-menu" onClick={this.toggleMenu}></div>
            <div className="sidebar__user-name">
              {this.state.user.username}
            </div>
            <div className="sidebar__user-informations">
              <div className="sidebar__user-informations-row">
                <span className="sidebar__user-informations-value">#7500</span>
                <span className="sidebar__user-informations-trend sidebar__user-informations-trend--up">+497</span>
              </div>
            </div>
          </div>
          <nav>
            <NavLink
              exact
              to={APP_STATES.HOME.path}
              className="sidebar__item" 
              activeClassName="sidebar__item--selected"
              onClick={this.toggleMenu}
            >
              <div className="sidebar__item-icon sidebar__item-icon--dashboard"></div>
              <span className="sidebar__item-label">Tableau de bord</span>
            </NavLink>

            <NavLink
              to={APP_STATES.DECKS.path}
              className="sidebar__item" 
              activeClassName="sidebar__item--selected"
              onClick={this.toggleMenu}
            >
              <div className="sidebar__item-icon sidebar__item-icon--decks"></div>
              <span className="sidebar__item-label">Mes decks</span>
            </NavLink>

            <NavLink
              to={APP_STATES.TEAM.path}
              className="sidebar__item" 
              activeClassName="sidebar__item--selected"
              onClick={this.toggleMenu}
            >
              <div className="sidebar__item-icon sidebar__item-icon--team"></div>
              <span className="sidebar__item-label">Mon équipe</span>
            </NavLink>)
          </nav>
          <div className="sidebar__logout">
            <button onClick={this.logout}>
              Se déconnecter
            </button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export const Sidebar = withRouter(SidebarComponent);