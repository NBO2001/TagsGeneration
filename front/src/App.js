import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {Home, Auth, AddUsers} from './pages';
import { ProvaiderAuth, PrivateRouter} from './components';

const App = () => {
   
  return (
    <ProvaiderAuth>
      <Router>
          <Switch>
            <Route path="/adm/addUsers" component={AddUsers} exact />
            <PrivateRouter path="/home" component={Home} />
            <Route path="/" component={Auth} />
          </Switch>
      </Router>
    </ProvaiderAuth>
  )
}

export default App
