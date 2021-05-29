import React from 'react';
import { Route } from 'react-router-dom';
import { APP_STATES } from './routes';
// import { Sidebar } from './modules/sidebar/Sidebar';
import './app.scss';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div className="app__menu-toggle"></div>
        {/* <Sidebar /> */}
        <div className="app">
          <div className="layout-container">
            {Object.values(APP_STATES).map((route, i) =>
              <Route 
                key={i}
                path={route.path} 
                exact={route.exact}
                render={props =>
                  <route.component {...props}/>
                }
              />
            )}
          </div>
        </div>
      </React.Fragment>
    )
  }
}