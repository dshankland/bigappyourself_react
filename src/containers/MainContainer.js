import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from '../components/Home';

const MainContainer = () => {

    return (
      <Router>
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </React.Fragment>
      </Router>
    )
}

export default MainContainer;
