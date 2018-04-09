import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Admin from "./routes/Admin/admin.js";
import Login from "./routes/Login/Login.js";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/admin" component={Admin} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
