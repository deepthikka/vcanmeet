import React, {useEffect, useState} from 'react';
import { Hub } from "aws-amplify";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './css/App.css';
import './css/theme.css';
import { Auth } from 'aws-amplify';

import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          getUser().then(userData => setUser(userData));
          break;
        case 'oAuthSignOut':
          setUser(null);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          setUser(null);
          break;
        default:
          //console.log('Unknown event : ', event);
          break;

      }
    });
  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then(userData => userData)
      .catch(() => console.log('Not signed in'));
  }

  async function logout() {
    console.log("Logging out")
    Auth.signOut();
  }

  return (
    <Router>
    <body className="home page-id-168 custom-background homepage-template">
    <div className="header-top homepage"  data-sticky='0'  data-sticky-mobile='1'  data-sticky-to='top' >
      <div className="navigation-wrapper ope-front-page">
        <div className="logo_col">
          <a className="text-logo" href="/">VcanMeet</a>
        </div>
        <div className="main_menu_col">
          <div id="drop_mainmenu_container" className="menu-menu-home-container">
            <ul id="drop_mainmenu" className="fm2_drop_mainmenu">
              <li id="menu-item-37" className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home menu-item-37"><a href="/" aria-current="page">Home</a></li>
              {user ? (
                <><li id="menu-item-235" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-235"><a href="/profile">Welcome {user.username}</a></li>
                <li id="menu-item-77" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-77"><a href="#" onClick={e => logout()}>Log Out</a></li>
                </>
              ) : (
                <><li id="menu-item-77" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-77"><a href="/signup">Join</a></li>
                <li id="menu-item-150" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-150"><a href="/login">Log In</a></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div id="page" className="site">
      <div className="header-wrapper">
        <div  className='header-homepage  color-overlay' style={{minHeight:""}}>
			    <div className="header-description gridContainer content-on-center">
				    <div className="row header-description-row">
              <div className="header-content header-content-centered">
                <div className="align-holder">
                  <div className="header-buttons-wrapper">
                  </div>        
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-separator header-separator-bottom ">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path className="svg-white-bg" d="M737.9,94.7L0,0v100h1000V0L737.9,94.7z"/>
          </svg>
        </div>
      </div>
    </div>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/profile" component={Profile} />
    </Switch>
    </body>
    </Router>
  );
}

export default App;
