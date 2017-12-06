import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Homepage from '../Homepage';
import UsersShow from '../users/UsersShow';

const Routes = () => {
  return(
    <Switch>
      <Route exact path="/" component={ Homepage } />
      <Route path="/users/:id" component={ UsersShow } />
    </Switch>
  );
};

export default Routes;
