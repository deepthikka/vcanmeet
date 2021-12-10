import React from "react";
import { Auth } from 'aws-amplify';
import {AmplifyConfirmSignUp} from "@aws-amplify/ui-react";
import './../css/Login.css';

export default class ConfirmSignup extends React.Component {

//     handleSubmit({ submitEvent: event }) {
//       alert(event)
//     try {
//       //await Auth.confirmSignUp(username, code);
//     } catch (error) {
//       console.log('error confirming sign up', error);
//     }
//   }

  async handleAuthStateChange(event) {
    switch (event) {
        case 'signin':
          window.location.href = '/login';
          break;
    }
  }

  render() {
    return(
      <div id="signupform">
          <AmplifyConfirmSignUp headerText="Check Email for Verification code and Confirm Signup" slot="confirm-sign-up"
          handleAuthStateChange={this.handleAuthStateChange}>
          </AmplifyConfirmSignUp>

      </div>
    );
  }
}