import React from 'react';
import { API } from 'aws-amplify';
import {NotificationManager} from 'react-notifications';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          eventList: []
        }
      };

  async componentDidMount() {

    let data = {};
    localStorage.setItem("event", "");

    if (this.props.match.params.category) {
      data = await API.get('event','/event/category/' +  this.props.match.params.category)
      if(data.error) {
        alert(data.error)
        return;
      }
    } else if (this.props.match.params.user) {
      data = await API.get('event','/event/' +  this.props.match.params.user)
      if(data.error) {
        alert(data.error)
        return;
      }
    } else if (this.props.match.params.keyword) {

    } else {
      data = await API.get('event','/event')
      if(data.error) {
        alert(data.error)
        return;
      }
    }
    let eventList = JSON.parse(data.body);
    if(eventList.length == 0) {
      NotificationManager.error('No Events matched this Search. Please try again', 'Error!', 2000);
      // window.location.href = '/';
    }
    this.setState({eventList: eventList});
  }

  eventClick(event) {
    localStorage.setItem("event", JSON.stringify(event));
    window.location.href = '/event';
  }

  render(){

    const Event = props => (
      <>
        <div class="wp-block-columns">
          <div class="wp-block-columns col1">
            <div class="wp-block-column">
              <p></p>
              <p>{props.eventDate}</p>
              <p>{props.startTime} {props.timeZone}</p>
              <p>Duration : {props.eventDuration} min</p>
              <div class="wp-block-buttons">
                <div class="wp-block-button is-style-fill">
                  <a class="wp-block-button__link has-black-color has-vivid-green-cyan-background-color has-text-color has-background"
                    onClick={() => this.eventClick(props)} >View
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="wp-block-columns col2">
            <div class="wp-block-column">
              <h4><strong>{props.eventName}</strong></h4>
              <p>{props.description} </p>
            </div>
          </div>
          <div class="wp-block-columns col3">
            <div class="wp-block-column">
              <p></p>
              <div class="wp-block-image is-style-rounded">
                <figure class="aligncenter">
                  <img loading="lazy" width="600px" height="200px"
                    src={props.image} alt="" />
                </figure>
              </div>  
            </div>
          </div>
        </div>
        <hr class="wp-block-separator has-text-color has-background has-vivid-cyan-blue-background-color has-vivid-cyan-blue-color is-style-wide" />
      </>
    );

    var eventElements = [];
    if(this.state.eventList) {
      for(var i=0; i<this.state.eventList.length; i++) {
        eventElements.push (
          <Event image={this.state.eventList[i].image} eventName={this.state.eventList[i].eventName} 
                eventDate={this.state.eventList[i].eventDate} startTime={this.state.eventList[i].startTime} 
                eventDuration={this.state.eventList[i].eventDuration} timeZone={this.state.eventList[i].timeZone}
                description={this.state.eventList[i].description} 
                id={this.state.eventList[i].eventId} userId={this.state.eventList[i].userId}/>
        );
      }
    }

    return (
    <>
        <div id="page-content" class="page-content eventBackground">
          <div class="gridContainer">
            <div id="post-293" class="post-293 page type-page status-publish hentry">
              <div>  
                {eventElements}
              </div>
            </div>
          </div>
        </div>  
    </>
    );
  }
}