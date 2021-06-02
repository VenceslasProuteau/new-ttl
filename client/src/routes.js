import { withAuth } from 'commons/authentication/authentication.component';
import { Dashboard } from 'modules/dashboard/dashboard.page';
// import { Team } from 'modules/team/Team';
// import { Decks } from 'modules/decks/Decks';
// import { DECK_ROUTES } from 'modules/decks/route';
// import { MainTemplate } from 'modules/decks/main-template';
import { LoginPage } from 'modules/login/login.page';
import { SignUpPage } from 'modules/signup/signup.page';

const EntryRedirect = (props) => {
  props.history.replace(APP_STATES.DASHBOARD.path);
  return null;  
}

const APP_STATES = {
  HOME: {
    path: '/',
    exact: true,
    component: withAuth(EntryRedirect),
  },
  LOGIN: {
    path: '/login',
    component: LoginPage,
  },
  SIGNUP: {
    path: '/signup',
    component: SignUpPage,
  },
  DASHBOARD: {
    path: '/dashboard',
    component: withAuth(Dashboard),
  },
  // DECKS: {
  //   path: '/decks',
  //   component: MainTemplate
  // },
  // TEAM: {
  //   path: '/team',
  //   component: Team,
  // }
}

export { APP_STATES };