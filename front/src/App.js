import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {Home, Auth, AddUsers, Dash, ManagerClients, LabelGenerator} from './pages';
import { ProvaiderAuth, PrivateRouter, ProvaiderConfig} from './components';
import { Reset } from 'styled-reset'

const App = () => {
   
  return (
    <ProvaiderAuth>
      <Reset />
      <Router>
          <Switch>
            <Route path="/adm/addUsers" component={AddUsers} exact />
            <Route path="/" component={Auth} exact/>
            <PrivateRouter path="/adm/clients" component={ManagerClients} exact />
            <Route path="/generator/:seach" component={LabelGenerator} exact/>
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
