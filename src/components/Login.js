import React from 'react';
import Amplify from 'aws-amplify';
import awsconfig from './../aws-exports';
import { Auth } from 'aws-amplify';
import App from '../App';

Amplify.configure(awsconfig);

export default class Login extends React.Component {

  componentDidMount(){ 
    Auth.federatedSignIn();
  }
  constructor(props) {
    super(props);
    this.state = {}
  }
  render(){
    return (
      <div>
        <h1>Login</h1>

      </div>
    );
  }
}