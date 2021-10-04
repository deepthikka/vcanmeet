/* global gapi */
/* global FB */
import React from "react";
import { Auth } from 'aws-amplify';
import {NotificationManager} from 'react-notifications';
import {AmplifyAuthenticator, AmplifySignIn} from "@aws-amplify/ui-react";
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

  onFBLogIn(fbUser) {
    // alert("Logged In as " + fbUser)
    // FB.login(function (response) {
    //   alert(response)
    // });
  }

  onGoogleLogIn(googleUser) {
    let user = {};
    user.id = googleUser.getBasicProfile().getId();
    user.name = googleUser.getBasicProfile().getName();
    user.gname = googleUser.getBasicProfile().getGivenName();
    user.fname = googleUser.getBasicProfile().getFamilyName();
    user.email = googleUser.getBasicProfile().getEmail();
    user.image = googleUser.getBasicProfile().getImageUrl();
    user.profile = {
          "youtubeChannelID":"UCXgGY0wkgOzynnHvSEVmE3A"
    }

    localStorage.setItem('user', JSON.stringify(user));
    NotificationManager.success('Welcome ' + user.name, 'Successful!', 10000);
    window.location.reload(false);
  }

  onFailure(error) {
    NotificationManager.Error('SignIn Failed! ' + error, 'Error!');
  }

  render(){

    const OtherMethods = props => (
      <div id="alternativeLogin">
        <label>Log In with:</label>
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
      <div id="g-signin2" />
    );

    return(
      <div id="loginform">
        <OtherMethods />
        <AmplifyAuthenticator usernameAlias="email">
          <AmplifySignIn headerText="Login with your Account" slot="sign-in"
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