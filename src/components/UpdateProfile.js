import React from 'react';
import { API } from 'aws-amplify';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {name: "", image: ""},
      profile: {}
    }
  }

  async componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({
      user: user
    })
  }
  

  render(){

    return (
      <>
      <div className="content">
        <div className="page-content"> 
          <div id="latest-posts" style={{backgroundColor: "#ffffff"}} data-label="Latest posts" data-id="blog-section" data-events="latest_news" className="blog-section"> 
            <div className="gridContainer block1"> 
              <div className="profileblock">
                <img className="center" width="150" height="150" src={this.state.user.image} />
              </div>
              <div className="nameblock">
                <h3 className="fontstyle">{this.state.user.name}</h3>  
              </div>
            </div>
        
        </div> 
      </div>
      </div></>
    );
  }
}