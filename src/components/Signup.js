import React from "react";
import { Auth } from 'aws-amplify';
import {AmplifySignUp} from "@aws-amplify/ui-react";
import './../css/Login.css';

export default class Signup extends React.Component {

  render(){

    const OtherMethods = props => (
      <div id="alternativeLogin">
        <label>Sign up with:</label>
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

    return(
      <div id="signupform">
        <OtherMethods />
          <AmplifySignUp headerText="or Signup for an Account" slot="sign-up"
          formFields={[
            { type: "username" },
            {
              type: "password",
            },
            { type: "email" }
          ]} 
          >
          </AmplifySignUp>
      </div>
    )

  }
}