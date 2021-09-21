import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './css/App.css';
import './css/theme.css';
import { Auth } from 'aws-amplify';

import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {

  const [user, setUser] = useState(null);
  getUser().then(userData => setUser(userData));
  
  async function getUser() {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      return userData;
    } catch (e) {
      return console.log('Not signed in');
    }
  }

  return (
    <Router>
    <body class="home page-id-168 custom-background homepage-template">
    <div class="header-top homepage"  data-sticky='0'  data-sticky-mobile='1'  data-sticky-to='top' >
      <div class="navigation-wrapper ope-front-page">
        <div class="logo_col">
          <a class="text-logo" href="/">VcanMeet</a>
        </div>
        <div class="main_menu_col">
          <div id="drop_mainmenu_container" class="menu-menu-home-container">
            <ul id="drop_mainmenu" class="fm2_drop_mainmenu">
              <li id="menu-item-37" class="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home menu-item-37"><a href="/" aria-current="page">Home</a></li>
              {user ? (
              <li id="menu-item-235" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-235"><a href="/">Profile Page</a></li>
              ) : (
                <><li id="menu-item-77" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-77"><a href="/signup">Join</a></li>
                <li id="menu-item-150" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-150"><a href="/login">Log In</a></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div id="page" class="site">
      <div class="header-wrapper">
        <div  class='header-homepage  color-overlay' style={{minHeight:""}}>
			    <div class="header-description gridContainer content-on-center">
				    <div class="row header-description-row">
              <div class="header-content header-content-centered">
                <div class="align-holder">
                  <div class="header-buttons-wrapper">
                  </div>        
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="header-separator header-separator-bottom ">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path class="svg-white-bg" d="M737.9,94.7L0,0v100h1000V0L737.9,94.7z"/>
          </svg>
        </div>
      </div>
    </div>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
    </Switch>
    </body>
    </Router>
  );
}

export default App;
