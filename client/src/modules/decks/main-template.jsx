import React from 'react';
import _ from 'lodash';
import { Route } from 'react-router-dom';
import { DECK_ROUTES } from './route';
import './decks.scss';

export const MainTemplate = () => (
  <React.Fragment>
    <div className="page">
      <div className="page__header">
        <div className="page__header-col">
          2021-05-12
        </div>
      </div>
      <div className="page__content">
        {
        _.values(DECK_ROUTES).map((route, i) => (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <route.component {...props} />
            )}
          />
        ))}
      </div>
    </div>
  </React.Fragment>
);
