import { withAuth } from 'commons/authentication/authentication.component';
import { Dashboard } from 'modules/dashboard/dashboard.page';
import { Team } from 'modules/team/team.page';
// import { Decks } from 'modules/decks/Decks';
// import { DECK_ROUTES } from 'modules/decks/route';
import { MainTemplate } from 'modules/decks/main-template';
import { LoginPage } from 'modules/login/login.page';
import { SignUpPage } from 'modules/signup/signup.page';

const APP_STATES = {
  HOME: {
    path: '/',
    exact: true,
    component: withAuth(Dashboard),
  },
  LOGIN: {
    path: '/login',
    component: LoginPage,
  },
  SIGNUP: {
    path: '/signup',
    component: SignUpPage,
  },
  DECKS: {
    path: '/decks',
    component: withAuth(MainTemplate),
  },
  TEAM: {
    path: '/team',
    component: withAuth(Team),
  }
}

export { APP_STATES };