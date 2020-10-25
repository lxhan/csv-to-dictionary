import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Upload from './Upload';
import List from './List';
import Details from './Details';
import Nav from './Nav';

export default function Routes() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/upload" component={Upload} />
        <Route exact path="/list" component={List} />
        <Route exact path="/details" component={Details} />
      </Switch>
    </Router>
  );
}
