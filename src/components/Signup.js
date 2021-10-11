import React from "react";
import {AmplifySignUp} from "@aws-amplify/ui-react";
import './../css/Login.css';
import { API } from 'aws-amplify';

export default class Signup extends React.Component {

  render(){

    return(
      <div id="signupform">
          <AmplifySignUp headerText="Signup for an Account" slot="sign-up"
          hideSignIn
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
          </AmplifySignUp>
      </div>
    )

  }
}