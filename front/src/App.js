import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {Home, Auth, AddUsers, Dash} from './pages';
import { ProvaiderAuth, PrivateRouter, ProvaiderConfig} from './components';

const App = () => {
   
  return (
    <ProvaiderAuth>
      <Router>
          <Switch>
            <Route path="/adm/addUsers" component={AddUsers} exact />
            <Route path="/" component={Auth} exact/>
            <ProvaiderConfig>
              <PrivateRouter path="/home" component={Home} />
              <PrivateRouter path="/dash" component={Dash} />
            </ProvaiderConfig>
          </Switch>
      </Router>
    </ProvaiderAuth>
  )
}

export default App
