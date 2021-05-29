import { Dashboard } from './modules/dashboard/dashboard.page';
// import { Team } from './modules/team/Team';
// import { Decks } from './modules/decks/Decks';
// import { DECK_ROUTES } from './modules/decks/route';
// import { MainTemplate } from './modules/decks/main-template';
import { LoginPage } from './modules/login/login.page';
import { SignUpPage } from './modules/signup/signup.page';

const EntryRedirection = ({ history }) => {
  history.replace(APP_STATES.LOGIN.path);
  return null;
};

const APP_STATES = {
  HOME: {
    path: '/',
    exact: true,
    component: EntryRedirection
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
    component: Dashboard,
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