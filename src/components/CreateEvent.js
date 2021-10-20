import React from 'react';
import { API } from 'aws-amplify';

import './../css/profile.css';
import { NotificationManager } from 'react-notifications';
import TimezonePicker from 'react-timezone-picker';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {},
      user: {}
    }
  }

  componentDidMount() {
    let user = JSON.parse(localStorage.getItem('user'));
    this.setState({
      user: user
    })
    this.state.event.user = user.id;
  }

  photoUpload = e => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    if (file.size > 60000) {
      alert("Please upload a photo less than 60kb");
      return;
    }
    let event = this.state.event;
    reader.onloadend = () => {
      event.image = reader.result;
      this.setState({
        event: event
      });
    }
    reader.readAsDataURL(file);
  }
  
  handleChange = e => {
    const key = e.target.id;
    const value = e.target.value;
    var event = this.state.event;
    event[key] = value;
    this.setState({
      event: event
    });
    //alert(JSON.stringify(event))
  }

  handleSubmit= e => {
    e.preventDefault();
    let updatedUser = this.state.updatedUser;
    if(Object.keys(this.state.updatedUser).length == 0)
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
                    <h3>Create Event</h3>
                    <label htmlFor="photo-upload" className="custom-file-upload fas">
                    <div className="img-wrap img-upload" >
                        <img htmlFor="photo-upload" src={this.state.event.image} alt=""/>
                      </div>
                      <input id="photo-upload" type="file" onChange={this.photoUpload}/> 
                    </label>                    
                    <label htmlFor="name">Event Banner</label>
                    <div className="field">
                      <label htmlFor="name">Event Name</label>
                      <input id="name" type="text" onChange={this.handleChange} maxLength="50" 
                        value={this.state.event.name} placeholder="Enter Event Name" required/>
                    </div>
                    <div className="field">
                      <label htmlFor="category">Event Category</label>
                      <select id="category" value={this.state.event.category} onChange={this.handleChange}
                        placeholder="Select the category for Event" required>
                        <option value="Music">Music</option>
                        <option value="Cooking">Cooking</option>
                        <option selected value="Dance">Dance</option>
                        <option value="Yoga">Yoga</option>
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="description">Event Description</label>
                      <textarea id="description" type="text" onChange={this.handleChange} maxLength="300" 
                        value={this.state.event.description} placeholder="Tell us about the event"/>
                    </div>
                    <div className="field">
                      <label htmlFor="date">Event Date</label>
                      <input id="eventDate" type="date" onChange={this.handleChange} maxLength="50" 
                        value={this.state.event.eventDate} placeholder="Enter Event Date" required/>
                    </div>                    
                    <div className="field">
                      <label htmlFor="startTime">Event Time</label>
                      <input id="startTime" type="time" onChange={this.handleChange} maxLength="50" 
                        value={this.state.event.startTime} placeholder="Enter Event Start Time" required/>
                      <input id="endTime" type="time" onChange={this.handleChange} maxLength="50" 
                        value={this.state.event.endTime} placeholder="Enter Event End Time" required/>         
                      {/* <TimezonePicker id="timeZone" value={this.state.event.timeZone} defaultValue={'America/New_York'}
                            onChange={this.handleChange} required/>            */}
                    </div>
                    <div className="field">
                      <label htmlFor="rate">Rate</label>
                      <input id="rate" type="number" onChange={this.handleChange} maxLength="50" 
                        value={this.state.event.rate} placeholder="Enter Rate per seat" required/>
                    </div>
                    <div className="field">
                      <label htmlFor="language">Language</label>
                      <select id="language" value={this.state.event.language} onChange={this.handleChange}
                        placeholder="Select the Language for the Event" required>
                        <option value="English">English</option>
                        <option value="French">French</option>
                        <option selected value="Tamil">Tamil</option>
                        <option value="Hindi">Hindi</option>
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="capacity">Max Capacity</label>
                      <input id="capacity" type="number" onChange={this.handleChange} maxLength="50" 
                        value={this.state.event.capacity} placeholder="Enter Maximum Capacity" required/>
                    </div>
                    <button type="submit" className="save" >Create Event</button>
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