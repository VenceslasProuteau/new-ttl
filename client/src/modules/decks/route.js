import { withRouter } from 'react-router-dom';
import { Decks } from './Decks';
import { DecksSelection } from './DecksSelection';
import { DECK_STATES } from './route-paths';

export const DECK_ROUTES = {
  HOME: {
    path: DECK_STATES.HOME,
    exact: true,
    component: withRouter(Decks)
  },
  SELECTION: {
    path: DECK_STATES.SELECTION,
    component: withRouter(DecksSelection),
  }
}