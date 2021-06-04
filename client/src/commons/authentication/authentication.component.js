import React from 'react';
import { Spinner } from 'commons/spinner/spinner.component';
import { AuthService } from './authentication.service';
import { UserService } from '../user/user.service';
import { APP_STATES } from 'app/routes';
import '../../app.scss';

export const withAuth = Component => class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    }
  }

  componentDidMount() {
    if (!AuthService.isAuthenticated()) {
      this.props.history.replace({
        pathname: APP_STATES.LOGIN.path,
        search: `?redirectUrl=${this.props.location.pathname}`,
      });
      return null;
    }
    this.setState({ isLoading: true });
    return UserService.getSelfUser()
      .then((user) => this.setState({ isLoading: false, user }));
  }

  render() {
    return this.state.isLoading ? <Spinner /> : <Component {...this.props} user={this.state.user} />
    // <React.Fragment>
    //   <div className="app__menu-toggle"></div>
    //   <Sidebar />
    //   <div className="app">
    //     <div className="layout-container">
    //       <Component {...props} />
    //     </div>
    //   </div>
    // </React.Fragment>
  }
}