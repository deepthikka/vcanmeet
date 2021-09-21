import React from "react";
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import { BrowserRouter, Route, Switch } from "react-router-dom";

export default () => 
<BrowserRouter>
   <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
   </Switch>
</BrowserRouter>;