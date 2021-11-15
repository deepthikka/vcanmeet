/* global gapi */
/* global FB */
import React from "react";
import {NotificationManager} from 'react-notifications';
import {AmplifySignUp} from "@aws-amplify/ui-react";
import './../css/Login.css';
import { API } from 'aws-amplify';

export default class Signup extends React.Component {

  componentDidMount() {
    gapi.signin2.render('g-signin2', {
      'scope': 'https://www.googleapis.com/auth/plus.login',
      'width': 250,
      'font-weight' : 'bold',
      'height': 40,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.onGoogleLogIn,
      'onfailure' : this.onFailure
    });  
  }

  async onGoogleLogIn(googleUser) {
    let user = {};
    user.id = googleUser.getBasicProfile().getId();
    user.name = googleUser.getBasicProfile().getName();
    user.email = googleUser.getBasicProfile().getEmail();
    user.image = googleUser.getBasicProfile().getImageUrl();

    NotificationManager.success('Login Successful!! Loading Profile', 'Successful!', 10000);
    alert(user.id)
    const data1 = await API.get('user','/user/'+user.id);

    if(data1.error) {
      alert(data1.error)
    }

    if(data1.body) {
      let profile = JSON.parse(data1.body);
      localStorage.setItem('profile', JSON.stringify(profile));
      if(profile.name)
        user.name = profile.name;

      if(profile.image) 
        user.image = profile.image;
    
      user.userType = profile.userType;
      user.description = profile.description;
      user.youtubeid = profile.youtubeid;
      user.instagramid = profile.instagramid;    
    }

    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = '/profile';
  }

  onFailure(error) {
    NotificationManager.Error('SignIn Failed! ' + error, 'Error!');
  }

  render(){

    const OtherMethods = props => (
      <div id="alternativeLogin">
        {/* <label>Log In with:</label> */}
        <div id="iconGroup">
          {/* <Facebook />      */}
        </div>
        <div id="iconGroup">
          <Google />
        </div>
      </div>
    );

    const Facebook = props => (
      <div className="fb-login-button" data-width="250" data-size="large" 
        data-button-type="login_with" data-layout="default" data-auto-logout-link="false" 
        data-use-continue-as="false" onClick={this.onFBLogIn()}
        data-scope="public_profile,email"></div>
    );


    const Google = props => (
      <div id="g-signin2"></div>
    );

    return(
      <div id="signupform">
          <OtherMethods />
          <AmplifySignUp headerText="Signup for an Account" slot="sign-up" hideSignIn
          formFields={[
            { type: "name",
              label: "Name",
              placeholder: "Enter Your Full name",
              key: "name",
              required: true,
            },            
            { type: 'username', 
              label: 'Email', 
              placeholder: 'Enter Your Email', 
              required: true 
            }, 
            { type: 'password', 
              label: 'Password', 
              placeholder: 'Enter Your Password', 
              required: true 
            }
            ]}
          >
          <div slot="secondary-footer-content">
            <span>Have an account? <a href="/login">Log In</a>
            </span>
          </div>
          </AmplifySignUp>
      </div>
    )

  }
}