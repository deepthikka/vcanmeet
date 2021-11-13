import React, {useContext, useEffect, useState} from 'react';
import { Hub, API } from "aws-amplify";

import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './css/App.css';
import './css/theme.css';
import { Auth } from 'aws-amplify';
import {NotificationManager, NotificationContainer} from 'react-notifications';

import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import UpdateProfile from './components/UpdateProfile';
import CreateEvent from './components/CreateEvent';
import Event from './components/Event';
import EventList from './components/EventList';
import CategoryList from './components/CategoryList';

import 'react-notifications/lib/notifications.css';

function App() {

  const [event, setEvent] = useState(null);

  function getUser() {
    try {
        Auth.currentUserInfo()
        .then((res) => {
          let user = {};
          user.id = res.username;
          user.name = res.attributes.name;
          user.email = res.attributes.email;
          user.image = res.attributes.picture;

          NotificationManager.success('Login Successful!! Loading Profile', 'Successful!', 10000);
          API.get('user','/user/'+user.id)
          .then(response => {
            if(response.body) {
              let profile = JSON.parse(response.body);
              localStorage.setItem('profile', JSON.stringify(profile));
              user.firstLogin = false;
              if(profile.name)
                user.name = profile.name;
        
              if(profile.image)
                user.image = profile.image;
            
              user.userType = profile.userType;
              user.description = profile.description;
              user.youtubeid = profile.youtubeid;
              user.instagramid = profile.instagramid;    
            } else {
              user.firstLogin = true;
              user.userType = "Follower";
              user.description = "";
              user.youtubeid = "";
              user.instagramid = ""; 
              user.image = "";
            }                  

            localStorage.setItem('user', JSON.stringify(user));
            window.location.reload(false);
            refreshPage();
            return res;
          })
          .catch(error => {
            // NotificationManager.error(error, 'Error!');
            alert(error.response)
          });
      
        })
        .catch(err => {
          localStorage.setItem('user', '');
          localStorage.setItem('profile', '');
          return null;
        });
    } catch(e) {
      localStorage.setItem('user', '');
      localStorage.setItem('profile', '');
      return null;
    }
  }

  function refreshPage() {
    window.location.reload(false);
  }
  
  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      //alert(event);
      switch (event) {
        case 'signIn':
          getUser();
          break;
        case 'signUp':
            NotificationManager.success('Succesfully Signed up!', 'Successful!', 2000);
            window.location.href = '/login';
            break;
        case 'signOut':
        case 'oAuthSignOut':
          localStorage.setItem('user', '');
          localStorage.setItem('profile', '');
          refreshPage();
          break;
        case 'signUp_failure':
          NotificationManager.error('Signup Failed! ' + data.message, 'Error!');
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          NotificationManager.error('Login Failed! ' + data.message, 'Error!');
          //refreshPage();
          break;
        default:
          break;

      }
    });
  }, []);



  async function logout() {
    Auth.signOut()
      .then(() => {
        NotificationManager.success('Succesfully Logged out!', 'Successful!', 2000);
      })
      .catch(err => {
        NotificationManager.error('Error : ' + err, 'Error!');
      }
    )
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
            <ul id="drop_mainmenu" className="fm2_drop_mainmenu" >
              <li id="menu-item-37" className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item menu-item-home menu-item-37">
              <div className="searchBar">
                <input id="searchQueryInput" type="text" name="searchQueryInput" placeholder="Find an Event" value={event} />
                <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
                <svg className="svgstyle" viewBox="0 0 24 24"><path fill="#666666" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" /></svg>
                </button>
              </div>
              </li>
              <li id="menu-item-37" className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item menu-item-home menu-item-37"><a href="/" aria-current="page">Home</a></li>
              {localStorage.getItem('user') ? (
                <><li id="menu-item-235" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-235"><a href="/profile">Profile</a></li>
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
      <NotificationContainer/>
    </div>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/signup" component={Signup} />
      {localStorage.getItem('user') ?
      <Redirect from="/login" to="/profile" />
      :
      <Route exact path="/login" component={Login} />
      }
      {/* {(localStorage.getItem('user') && (JSON.parse(localStorage.getItem('user')).firstLogin) == false) ?
      <Route exact path="/profile" component={Profile} />
      : <Redirect from="/profile" to="/updateProfile" />
      } */}
      {localStorage.getItem('user') ?
      <Route exact path="/profile" component={Profile} />
      : <Redirect from="/profile" to="/login" />
      }      
      {localStorage.getItem('user') ?
      <Route exact path="/updateProfile" component={UpdateProfile} />
      : <Redirect from="/updateProfile" to="/login" />
      }
      <Route exact path="/createEvent" component={CreateEvent}/>
      <Route exact path="/event" component={Event}/>
      <Route exact path="/eventList/" component={EventList}/>
      <Route exact path="/categoryList/" component={CategoryList}/>
    </Switch>
    </body>
    <div className="footer">
      <div className="gridContainer">
        <div className="row">
          <p className="footer-copyright">
            &copy;&nbsp;&nbsp;2021&nbsp;VcanMeet v0.3&nbsp;Contact : info@vcanmeet.com</p>
        </div>
      </div>
    </div>
    </Router>
  );
}

export default App;
