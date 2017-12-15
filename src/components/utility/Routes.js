import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import NoRoute from './NoRoute';

import Homepage from '../Homepage';
import UsersShow from '../users/UsersShow';
import UsersEdit from '../users/UsersEdit';
import StreamsIndex from '../streams/StreamsIndex';

const Routes = () => {
  return(
    <Switch>
      <Route exact path="/" component={ Homepage } />
      <ProtectedRoute path="/users/:id/edit" component={ UsersEdit } />
      <ProtectedRoute path="/users/:id" component={ UsersShow } />
      <ProtectedRoute path="/streams" component={ StreamsIndex } />
      <Route component={NoRoute} />
    </Switch>
  );
};

export default Routes;
