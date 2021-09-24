import React from "react";
import { Auth } from 'aws-amplify';
import {AmplifyAuthenticator, AmplifySignIn} from "@aws-amplify/ui-react";
import './../css/Login.css';
import { Redirect } from "react-router";

export default class Login extends React.Component {

  constructor(props){
    super(props);
  }

  render(){

    const OtherMethods = props => (
      <div id="alternativeLogin">
        <label>Log In with:</label>
        <div id="iconGroup">
          <Facebook />
          <Google />
        </div>
      </div>
    );
    
    const Facebook = props => (
      <a href="#" id="facebookIcon" onClick={() => Auth.federatedSignIn({ provider: "Facebook" })} ></a>
    );
    
    const Google = props => (
      <a href="#" id="googleIcon" onClick={() => Auth.federatedSignIn({ provider: "Google" })} ></a>
    );

  //   const federated = {
  //     googleClientId: '431440944618-rq4ulhuvev3i1osgr6gdv49d3b0ahsjf.apps.googleusercontent.com',
  //     facebookAppId: '978675252693276',
  // };

    return(
      <div id="loginform">
        <OtherMethods />
        <AmplifyAuthenticator>
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