import React from 'react';
import { Auth } from 'aws-amplify';

export default class Signup extends React.Component {

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
        <h1>Signup</h1>

      </div>
    );
  }
}