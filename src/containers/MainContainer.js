import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from '../components/Home';
import ComplimentContainer from './ComplimentContainer';

const MainContainer = () => {

    return (
      <Router>
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/compliment" component={ComplimentContainer} />
          </Switch>
        </React.Fragment>
      </Router>
    )
}

export default MainContainer;
