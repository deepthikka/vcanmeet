import React from 'react';
import moment from 'moment';
import { API } from 'aws-amplify';
import SelectCurrency from 'react-select-currency';

import './../css/profile.css';
import { NotificationManager } from 'react-notifications';
// import { TimezonePicker } from "baseui/timezonepicker";
import TimezonePicker from 'react-bootstrap-timezone-picker';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {},
      user: {},
      categories:{},
      submitText: "Create Event"
    }
  }

  async componentDidMount() {
    let user = JSON.parse(localStorage.getItem('user'));
    this.setState({
      user: user
    })

    let event = {};
    const localEvent = localStorage.getItem('event');
    if(localEvent === null || localEvent === "") {
      event.userId = user.id;
      event.userName = user.name;
      event.currency = "INR";
      event.language = "English";
      event.timeZone = "Asia/Colombo";
    } else {
      event = JSON.parse(localEvent);
      this.setState({submitText: "Update Event"});
    }

    const data = await API.get('category','/category/limit')
    if(data.error) {
      alert(data.error)
      return;
    }
    let cat = JSON.parse(data.body);
    this.setState({categories: cat});
    event.category = cat[0].Name;
    this.setState({event: event});
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

  handleTimeZoneChange = e => {
    var event = this.state.event;
    event.timeZone = e;
    this.setState({
      event: event
    });
  }
  
  handleChange = e => {
    const key = e.target.id;
    const value = e.target.value;
    var event = this.state.event;
    //alert(key + " " + value)
    event[key] = value;
    this.setState({
      event: event
    });
    //alert(JSON.stringify(event))
  }


  handleSubmit= e => {
    e.preventDefault();
    let event = this.state.event;
    if(event.eventId == null) {
      event.eventId = new Date().valueOf() + "";
      //alert("Created Event ID" + event.eventId);
    }

    let input = {body : event}
    API.put('event', '/event', input)
      .then(response => {

        if(response.error) {
          NotificationManager.error(response.error, 'Error!');
        } else {
          if(this.state.submitText === "Create Event")
            NotificationManager.success('Event Created Successfully', 'Successful!', 2000);
          else
            NotificationManager.success('Event Updated Successfully', 'Successful!', 2000);
          setTimeout(() => {  window.location.href = '/profile';}, 1000);
        }
      })
      .catch(error => {
        NotificationManager.error(error, 'Error!');
      });
  }
      
  render(){

    let categoryList = this.state.categories && this.state.categories.length > 0
      && this.state.categories.map((item, i) => {
        return (
          <option value={item.Name}>{item.Title}</option>
        )
      }, this);

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
                    <label className="custom-file-upload fas">
                      <div>
                        <img className="profileblock" src={this.state.event.image} alt=""/>
                      </div>
                      <input id="photo-upload" type="file" onChange={this.photoUpload}/> 
                    </label>                    
                    <label htmlFor="name">Event Banner</label>
                    <div className="field">
                      <label htmlFor="name">Event Name</label>
                      <input id="eventName" type="text" onChange={this.handleChange} maxLength="50" 
                        value={this.state.event.eventName} placeholder="Enter Event Name" required/>
                    </div>
                    <div className="field">
                      <label htmlFor="category">Event Category</label>
                      <select id="category" value={this.state.event.category}
                        onChange={this.handleChange}
                        placeholder="Select the category for Event" required>
                        {categoryList}
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="description">Event Description</label>
                      <textarea id="description" type="text" onChange={this.handleChange} maxLength="300" 
                        value={this.state.event.description} placeholder="Tell us about the event"/>
                    </div>
                    <div className="field">
                      <label htmlFor="date">Event Date and Time</label>     
                      <div >                  
                        <input id="eventDate" style={{width:"250px"}} type="date" onChange={this.handleChange} maxLength="50" 
                          value={this.state.event.eventDate} min={moment().format("YYYY-MM-DD")}
                          placeholder="Enter Event Date" required/>
                        <input id="startTime" style={{width:"150px"}} type="time" onChange={this.handleChange} maxLength="50" 
                          value={this.state.event.startTime} placeholder="Enter Event Start Time" required/>
                      </div>
                    </div>
                    <div className="field">
                      <label htmlFor="timeZone">Time Zone</label>     
                      <TimezonePicker value={this.state.event.timeZone} onChange={this.handleTimeZoneChange}/>
                      {/* <TimezonePicker value={this.state.event.timeZone} onChange={({ id }) => this.handleTimeZoneChange(id)}/> */}
                    </div>
                    <div className="field">
                      <label htmlFor="eventDuration">Event Duration in Minutes</label>
                      <input id="eventDuration" type="number" onChange={this.handleChange} maxLength="50" 
                        value={this.state.event.eventDuration} placeholder="Enter Duration" required/>          
                    </div>
                    <div className="field">
                      <label htmlFor="price">Ticket Price and Currency</label>     
                    </div>        
                    <div>            
                      <div className="sideBox" >
                        <input id="price"  type="number" onChange={this.handleChange} maxLength="50" 
                          value={this.state.event.price} placeholder="Enter Price per ticket" required/>
                      </div>
                      <div className="sideBox">
                        <SelectCurrency id="currency" value={'INR'} onChange={this.handleChange} required/>
                      </div>
                    </div>
                    <div className="field">
                      <label htmlFor="language">Language</label>
                      <select id="language" value={this.state.event.language} onChange={this.handleChange}
                        placeholder="Select the Language for the Event" required>
                        <option selected value="English">English</option>
                        <option value="French">French</option>
                        <option value="Tamil">Tamil</option>
                        <option value="Hindi">Hindi</option>
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="capacity">Max Capacity</label>
                      <input id="capacity" type="number" onChange={this.handleChange} maxLength="50" 
                        value={this.state.event.capacity} placeholder="Enter Maximum Capacity" required/>
                    </div>
                    <button type="submit" className="save saveButton" >{this.state.submitText}</button>
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