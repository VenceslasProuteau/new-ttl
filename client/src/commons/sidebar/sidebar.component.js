import React from 'react';
import {withRouter, NavLink} from 'react-router-dom';
import classNames from 'classnames';

import { UserService } from 'commons/user/user.service';
import {APP_STATES} from 'app/routes';
import { DECK_STATES } from 'modules/decks/route-paths';
import './sidebar.scss';

class SidebarComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      isMenuToggled: false,
    }
    this.toggleMenu = this.toggleMenu.bind(this);
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
  
  render() {
    return this.state.isLoading
    ? <div>isLoading ...</div>
    : (
      <React.Fragment>
        <div className="sidebar__toggle-menu" onClick={this.toggleMenu}></div>
        <div className={classNames('sidebar', { 'sidebar--toggled': this.state.isMenuToggled })}>
          <div className="sidebar__user-card">
            <div className="sidebar__close-menu" onClick={this.toggleMenu}></div>
            <div className="sidebar__user-name">
              {this.state.user.pseudo}
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
              to={APP_STATES.DASHBOARD.path}
              className="sidebar__item" 
              activeClassName="sidebar__item--selected"
              onClick={this.toggleMenu}
            >
              <div className="sidebar__item-icon sidebar__item-icon--dashboard"></div>
              <span className="sidebar__item-label">Tableau de bord</span>
            </NavLink>

            <NavLink
              to={DECK_STATES.HOME}
              className="sidebar__item" 
              activeClassName="sidebar__item--selected"
              onClick={this.toggleMenu}
            >
              <div className="sidebar__item-icon sidebar__item-icon--decks"></div>
              <span className="sidebar__item-label">Mes decks</span>
            </NavLink>

            {this.state.user.teamId && (<NavLink
              to={APP_STATES.TEAM.path}
              className="sidebar__item" 
              activeClassName="sidebar__item--selected"
              onClick={this.toggleMenu}
            >
              <div className="sidebar__item-icon sidebar__item-icon--team"></div>
              <span className="sidebar__item-label">Mon équipe</span>
            </NavLink>)}
          </nav>
        </div>
      </React.Fragment>
    )
  }
}

export const Sidebar = withRouter(SidebarComponent);