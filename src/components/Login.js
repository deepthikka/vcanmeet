import React from 'react';
import { Auth } from 'aws-amplify';
import App from '../App';


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