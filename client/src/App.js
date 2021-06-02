import React from 'react';
import { Route } from 'react-router-dom';
import { APP_STATES } from './routes';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      Object.values(APP_STATES).map((route, i) =>
        <Route
          key={i}
          path={route.path} 
          exact={route.exact}
          render={props =>
            <route.component {...props}/>
          }
        />
      )
    )
  }
}