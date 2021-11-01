import React from 'react';
import { API } from 'aws-amplify';

import './../css/profile.css';
import { NotificationManager } from 'react-notifications';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      updatedUser: {}
    }
  }

  componentDidMount() {
    let user = JSON.parse(localStorage.getItem('user'));
    let updatedUser = JSON.parse(localStorage.getItem('profile'));
    this.setState({
      user: user,
      updatedUser: updatedUser
    })
  }

  photoUpload = e => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    if (file.size > 60000) {
      alert("Please upload a photo less than 60kb");
      return;
    }
    let user = this.state.user;
    let updatedUser = this.state.updatedUser;
    reader.onloadend = () => {
      user.image = reader.result;
      updatedUser.image = reader.result;
      this.setState({
        user: user,
        updatedUser: updatedUser
      });
    }
    reader.readAsDataURL(file);
  }

  handleChange = e => {
    const key = e.target.id;
    const value = e.target.value;
    var user = this.state.user;
    var updatedUser = this.state.updatedUser;
    user[key] = value;
    updatedUser[key] = value;

    this.setState({
      user: user,
      updatedUser: updatedUser
    });
  }
  
  handleSubmit= e => {
    e.preventDefault();
    let updatedUser = this.state.updatedUser;
    if(Object.keys(this.state.updatedUser).length === 0)
      alert("No change in Profile data")
    else {
      updatedUser.id = this.state.user.id;
      if(this.state.user.firstLogin)
        updatedUser.userType = "Influencer";

      let input = {body : updatedUser}
      API.put('user', '/user', input)
      .then(response => {
        //alert(JSON.stringify(response))
        NotificationManager.success('Profile Successfully Updated', 'Successful!', 1000);
        this.state.user.firstLogin = false;
        localStorage.setItem('user', JSON.stringify(this.state.user));
        localStorage.setItem('profile', JSON.stringify(this.state.updatedUser));
        window.location.href = '/profile';
      })
      .catch(error => {
        // NotificationManager.error(error, 'Error!');
        alert("Image upload Error. Kindly retry!!")
      });
    }
  }
      
  render(){
    return (
      <>
      <div className="content">
        <div className="page-content"> 
          <div id="latest-posts" style={{backgroundColor: "#ffffff"}} data-label="Latest posts" data-id="blog-section" data-events="latest_news" className="blog-section"> 
            <div className="gridContainer block2"> 
              <div>
                <div className="card">
                  <form onSubmit={this.handleSubmit}>
                    <h3>Update your Profile</h3>
                    <label htmlFor="photo-upload" className="custom-file-upload fas">
                      <div className="img-wrap img-upload" >
                        <img htmlFor="photo-upload" src={this.state.user.image} alt=""/>
                      </div>
                      <input id="photo-upload" type="file" onChange={this.photoUpload}/> 
                    </label>                    
                    <div className="field">
                      <label htmlFor="name">Name</label>
                      <input id="name" type="text" onChange={this.handleChange} maxLength="50" 
                        value={this.state.user.name} placeholder="Enter Full Name" required/>
                    </div>
                    <div className="field">
                      <label htmlFor="description">Description</label>
                      <textarea id="description" type="text" onChange={this.handleChange} maxLength="300" 
                        value={this.state.user.description} placeholder="Tell us about yourself"/>
                    </div>
                    <div className="field">
                      <label htmlFor="youtubeid">Youtube ID</label>
                      <input id="youtubeid" type="text" onChange={this.handleChange} maxLength="50" 
                        value={this.state.user.youtubeid} placeholder="Enter Youtube Channel ID"/>
                    </div>
                    <div className="field">
                      <label htmlFor="instagramid">Instagram ID</label>
                      <input id="instagramid" type="text" onChange={this.handleChange} maxLength="50" 
                        value={this.state.user.instagramid} placeholder="Enter Instagram Channel ID"/>
                    </div>
                    <button type="submit" className="save" >Update </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>        
      </div>
      </>
    );
  }
} 