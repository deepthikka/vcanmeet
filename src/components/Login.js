/* global gapi */
import React from "react";
import {NotificationManager} from 'react-notifications';
import {AmplifyAuthenticator, AmplifySignIn} from "@aws-amplify/ui-react";
import './../css/Login.css';
import { API } from 'aws-amplify';
import FacebookLogin from 'react-facebook-login';

import './../css/Login.css';

export default class Login extends React.Component {

  constructor(props){
    super(props);
  }

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

  async onFacebookLogIn(response) {
    let user = {};
    user.id = response.id;
    user.name = response.name;
    user.email = response.email;
    user.image = response.picture.data.url

    NotificationManager.success('Login Successful!! Loading Profile', 'Successful!', 10000);
    const data1 = await API.get('user','/user/'+user.id);

    if(data1.error) {
      alert(data1.error)
    }

    let profile = {};

    if(data1.body) {
      profile = JSON.parse(data1.body);
      if(profile.name)
        user.name = profile.name;

      if(profile.image) 
        user.image = profile.image;
    
      user.userType = profile.userType;
      user.description = profile.description;
      user.youtubeid = profile.youtubeid;
      user.instagramid = profile.instagramid;    
    }
    localStorage.setItem('profile', JSON.stringify(profile));
    localStorage.setItem('user', JSON.stringify(user));
    window.location.reload(false);
  }

  async onGoogleLogIn(googleUser) {
    let user = {};
    user.id = googleUser.getBasicProfile().getId();
    user.name = googleUser.getBasicProfile().getName();
    user.email = googleUser.getBasicProfile().getEmail();
    user.image = googleUser.getBasicProfile().getImageUrl();

    NotificationManager.success('Login Successful!! Loading Profile', 'Successful!', 10000);
    const data1 = await API.get('user','/user/'+user.id);

    if(data1.error) {
      alert(data1.error)
    }

    let profile = {};

    if(data1.body) {
      profile = JSON.parse(data1.body);
      if(profile.name)
        user.name = profile.name;

      if(profile.image) 
        user.image = profile.image;
    
      user.userType = profile.userType;
      user.description = profile.description;
      user.youtubeid = profile.youtubeid;
      user.instagramid = profile.instagramid;    
    }
    localStorage.setItem('profile', JSON.stringify(profile));
    localStorage.setItem('user', JSON.stringify(user));
    window.location.reload(false);
  }

  onFailure(error) {
    NotificationManager.error('SignIn Failed! ' + JSON.stringify(error), 'Error!');
  }

  render(){

    const OtherMethods = props => (
      <div id="alternativeLogin">
        <div id="iconGroup">
          <Facebook />     
        </div>
        <div id="iconGroup">
          <Google />
        </div>
      </div>
    );
    
    const Facebook = props => (

      <FacebookLogin
              appId="978675252693276"
              autoLoad={false}
              fields="name,email,picture"
              scope="public_profile,user_friends"
              cssClass="btnFacebook"
              callback={this.onFacebookLogIn}
              icon={
                <i className="fa fa-facebook fa-lg" style={{marginLeft:'7px'}}></i>
              }
              textButton = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sign In with Facebook"                                                                
              />
    );


    const Google = props => (
      <div id="g-signin2" />
    );

    return(
      <div id="loginform">
        <OtherMethods />
        <AmplifyAuthenticator usernameAlias="email">
          <AmplifySignIn headerText="Or Login with a Custom Account" slot="sign-in"
            hideSignUp
            // federated={federated}
          >
            <div slot="federated-buttons"></div>
          </AmplifySignIn>
        </AmplifyAuthenticator>
      </div>
    )

  }
}