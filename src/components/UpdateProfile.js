import React from 'react';
import { API } from 'aws-amplify';

import './../css/profile.css';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }

  async componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({
      user: user
    })
  }

  photoUpload = e =>{
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    let user = this.state.user;
    reader.onloadend = () => {
      user.image = reader.result;
      this.setState({
        user: user
      });
    }
    reader.readAsDataURL(file);
  }
  
  render(){

    const ImgUpload =({
      onChange,
      src
    })=>
      <label htmlFor="photo-upload" className="custom-file-upload fas">
        <div className="img-wrap img-upload" >
          <img for="photo-upload" src={src}/>
        </div>
        <input id="photo-upload" type="file" onChange={onChange}/> 
      </label>
    
    
   
    const Edit =({
      onSubmit,
      children,
    })=>
      <div className="card">
        <form onSubmit={onSubmit}>
          <h3>User Profile</h3>
            {children}
          <button type="submit" className="save">Update </button>
        </form>
      </div>
    
  
    return (
      <>
      <div className="content">
        <div className="page-content"> 
          <div id="latest-posts" style={{backgroundColor: "#ffffff"}} data-label="Latest posts" data-id="blog-section" data-events="latest_news" className="blog-section"> 
            <div className="gridContainer block2"> 
              <div>
                <Edit onSubmit={this.handleSubmit}>
                  {/* <ImgUpload onChange={this.photoUpload} src={imagePreviewUrl}/>
                  <Name onChange={this.editName} value={name}/> */}
                  <ImgUpload src={this.state.user.image} onChange={this.photoUpload}/>
                  <div className="field">
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" onChange={this.handleSubmit} maxlength="50" 
                      value={this.state.user.name} placeholder="Enter Full Name" required/>
                  </div>
                  <div className="field">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" type="text" onChange={this.handleSubmit} maxlength="300" 
                      value={this.state.user.description} placeholder="Tell us about yourself"/>
                  </div>
                  <div className="field">
                    <label htmlFor="youtubeid">Youtube ID</label>
                    <input id="youtubeid" type="text" onChange={this.handleSubmit} maxlength="50" 
                      value={this.state.user.youtubeid} placeholder="Enter Youtube Channel ID"/>
                  </div>
                  <div className="field">
                    <label htmlFor="instagramid">Instagram ID</label>
                    <input id="instagramid" type="text" onChange={this.handleSubmit} maxlength="50" 
                      value={this.state.user.instagramid} placeholder="Enter Instagram Channel ID"/>
                  </div>

                </Edit>
              </div>
            </div>
          </div>
        </div>        
      </div>
      </>
    );
  }
} 