import React from "react";
import { Auth } from 'aws-amplify';
import {AmplifySignUp} from "@aws-amplify/ui-react";
import './../css/Login.css';

export default class Signup extends React.Component {

  render(){

    return(
      <div id="signupform">
          <AmplifySignUp headerText="Signup for an Account" slot="sign-up"
          formFields={[
            {
              type: "custom:usertype",
              label: "User type",
              key: "custom:usertype",
              placeholder: "Enter Influencer or Follower",
              required: true,
            },
            { type: "name",
              label: "Name",
              key: "name",
              placeholder: "Enter Full name",
              required: true,
            },
            { type: "username" },
            { type: "password"},
            { type: "email" },
            { type: "picture",
              label: "Picture",
              key: "picture",
              placeholder: "Upload your picture",
              required: true,
            },
            {
              type: "custom:instagramurl",
              label: "Instagram Handle",
              key: "custom:instagramurl",
              placeholder: "Instagram Handle URL",
              required: false,
            },
            {
              type: "custom:youtubeurl",
              label: "Youtube Handle",
              key: "custom:youtubeurl",
              placeholder: "Youtube Handle URL",
              required: false,
            }
          ]} 
          >
          </AmplifySignUp>
      </div>
    )

  }
}