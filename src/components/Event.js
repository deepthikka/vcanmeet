import React from 'react';
import { API } from 'aws-amplify';
import {NotificationManager} from 'react-notifications';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import moment from 'moment';

import Modal from "./BookModal";
import { composeDynamic } from 'styletron-react';

/* State description
 1 - Cancelled
 2 - Join Event for Influencer and Booked Follower
 3 - Booking Closed for New Influencers
 4 - Edit Event - For Influencer
 5 - Re confirm Booking - For Follower, If Influencer Edited the Event Date time or cost
 6 - Cancel Booking - For Follower before cut-off time
 7 - Book Now - To allow New Booking
 8 - Event Will start soon - For Influencer or Follower after cut off time
 9 - Completed
 */

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      event: {},
      eventState : 0,
      eventTag : "",
      owner: true,
      userLoggedIn: "",
      hasBooked: false,
      bookingModal: false,
      code: "",
      modalInputName: "",
      price: ""
    }
  }

  async componentDidMount() {
    var localUser = localStorage.getItem('user');
    var user = {};

    if(localUser !== null && localUser !== "") {
      user = JSON.parse(localUser);
      this.setState({userLoggedIn: user.id});
    }

    let eventOwner = {};
    const localEvent = localStorage.getItem('event');
    if(localEvent === null || localEvent === "") {
      NotificationManager.error('Event does not Exist', 'Error!');
      window.location.href = '/home';
      return;
    }
    
    const even = JSON.parse(localEvent);


    if(user.id === null || even.userId !== user.id) {
      this.setState({owner: false});

      API.get('user','/user/'+ even.userId)
      .then(data1 => {
        if(data1.error) {
          alert(data1.error)
        }
        if(data1.body) {
          eventOwner = JSON.parse(data1.body);
          this.setState({
            user: eventOwner
          })
        }
      })
      .catch(error => {
        alert(error)
      })
    } else {
      eventOwner = user;
      this.setState({
        user: eventOwner
      })
    }

    const data = await API.get('event','/event/view/' + even.userId + '/' + even.eventId)
    if(data.error) {
      alert(data.error)
      return;
    }
    let outputEvent = JSON.parse(data.body);
    if(outputEvent && outputEvent.eventId) {
      this.setState({event: outputEvent});
      this.state.price = this.state.event.price;
      localStorage.setItem("event", data.body);

    if(user.id !== null && even.userId !== user.id) {
      await API.get('booking','/booking/'+ even.eventId + '/' + user.id)
      .then(data2 => {
        if(data2.error) {
          alert(data2.error)
        }
        if(data2.body) {
            this.setState({hasBooked: true});
        }  
      })
      .catch(error => {
        alert(error)
      })
    }

      if(even.eventstatus && even.eventstatus === "Cancelled") {
        this.setState({eventState: 1});
        this.setState({eventTag: "Event Cancelled"});
        return;
      }
  
      if(even.eventstatus && even.eventstatus === "Completed") {
        this.setState({eventState: 9});
        this.setState({eventTag: "Event Completed"});
        return;
      }

      if(outputEvent.joinTime && outputEvent.joinTime === true) { 
        if (this.state.owner || this.state.hasBooked) {
          this.setState({eventState: 2});
          this.setState({eventTag: "Join Event"});
        } else{
          this.setState({eventState: 3});
          this.setState({eventTag: "Booking Closed"});          
        }
      } else if (this.state.owner) {
        if (outputEvent.editAllowed) {
          this.setState({eventState: 4});
          this.setState({eventTag: "Edit Event"});
        } else {
          this.setState({eventState: 8});
          this.setState({eventTag: "Event Will Start Soon"});
        }
      } else if (this.state.hasBooked) {  
        if(outputEvent.cancelAllowed) {
          this.setState({eventState: 5});
          this.setState({eventTag: "Re-Confirm Booking"});
        } else if (outputEvent.bookingAllowed) {
          this.setState({eventState: 6});
          this.setState({eventTag: "Cancel Booking"});
        } else {
          this.setState({eventState: 8});
          this.setState({eventTag: "Event Will Start Soon"});         
        }
      } else {
        if (outputEvent.bookingAllowed) {
          this.setState({eventState: 7});
          this.setState({eventTag: "Book Now"});    
        } else {
          this.setState({eventState: 3});
          this.setState({eventTag: "Booking Closed"});              
        }
      }


    } else {
      NotificationManager.error('Event does not Exist', 'Error!', 2000);
      window.location.href = '/profile';
    }
  }

  handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
      price: '0'
    });
  }

  handleBookingReConfirm() {
    //Deepthi - To add logic for re-confirmation
    alert(" Logic to be added for Re-Confirmation")
  }

  handleBookingCancel() {

    API.del('booking','/booking/'+ this.state.event.eventId + '/' + this.state.userLoggedIn)
      .then(response => {

        if(response.error) {
          NotificationManager.error(response.error, 'Error!');
        } else {
          NotificationManager.success('Booking Cancelled Successfully', 'Successful!', 2000);
          setTimeout(() => {  window.location.href = '/profile';}, 1000);
        }
      })
      .catch(error => {
        NotificationManager.error(error, 'Error!');
      });
  }

  handleBooking(e) {
    //alert(this.state.eventTag + " " + this.state.eventState)
    switch(this.state.eventState) {
      case 4: //Edit Event
        window.location.href = '/createEvent';
        break;
      case 5: //Re-confirm Booking
      const reconfirmBox = window.confirm(
        "Event has been Re-Scheduled. Please click Ok to Re-Confirm or Cancel to Cancel Event Booking"
      )
      if (reconfirmBox === true) {
        this.handleBookingReConfirm()
      } else {
        this.handleBookingCancel()
      }
      break;      
      case 6: //Cancel Booking
        const confirmBox = window.confirm(
          "Booking cancellation will be with penality. Do you really want to cancel this Booking?"
        )
        if (confirmBox === true) {
          this.handleBookingCancel()
        }
        break;
      case 7: //Book Now
        this.modalOpen(e);
        break;
      default:
        break;
    }
  }

  handleCancelEvent(e) {
    const confirmBox = window.confirm(
      "Event cancellation will be with penality. Do you really want to cancel this Event?"
    )
    if (confirmBox === true) {
      let event = this.state.event;
      event.eventstatus = "Cancelled";
      event.editAllowed = false;
      event.cancelAllowed = false;
      event.bookingAllowed = false;
  
      let input = {body : event}
      API.put('event', '/event', input)
        .then(response => {
  
          if(response.error) {
            NotificationManager.error(response.error, 'Error!');
          } else {
            NotificationManager.success('Event Cancelled Successfully', 'Successful!', 2000);
            if(event.bookedCount) {
              //Deepthi - Initiate Refund for all booked Influencers
            }
            setTimeout(() => {  window.location.href = '/profile';}, 1000);
          }
        })
        .catch(error => {
          NotificationManager.error(error, 'Error!');
        });
    }
  }

  handleSubmit(e) {
    this.setState({ code: this.state.modalInputName });

    var booking = {
      eventId : this.state.event.eventId,
      userId: this.state.userLoggedIn,
      actualPrice: this.state.event.price,
      currency: this.state.event.currency,
      promoCode: this.state.modalInputName,
      finalPrice: this.state.price,
      bookingTime: new Date().toISOString()
    };

    let input = {body : booking}
    API.put('booking', '/booking', input)
      .then(response => {

        if(response.error) {
          NotificationManager.error(response.error, 'Error!');
        } else {
          NotificationManager.success('Booked Event Successfully', 'Successful!', 2000);
          this.setState({hasBooked: true})
          setTimeout(() => {this.modalClose();}, 1000);
          window.location.href = '/profile';
        }
      })
      .catch(error => {
        alert(error)
        //NotificationManager.error(error, 'Error!');
      });

  }

  modalOpen() {

    if(this.state.userLoggedIn !== "")
      this.setState({ bookingModal: true });
    else {
      NotificationManager.error( 'Please register to Book Event!');
          setTimeout(() => {  window.location.href = '/signup';}, 1000);
    }
  } 
  
  modalClose() {
    this.setState({
      modalInputName: "",
      bookingModal: false
    });
  }

  render(){
    return (
      <>
      <div id="page-content" class="page-content eventBackground">
        <div className="gridContainer block1"> 
          <div>
            <img className="profileblock" src={this.state.user.image} />
          </div>
          <div className="nameblock">
            <h3 className="fontstyle">{this.state.user.name}</h3>  
            <p className="descstyle">{this.state.user.description}</p>
         </div>
         <hr class="wp-block-separator is-style-wide"/>
        </div>

        <div class="gridContainer">
          <div class="page type-page status-publish has-post-thumbnail hentry">
            <div>
              <div class="wp-block-columns">
              <div class="wp-block-columns" style={{width:"33.33%"}}>
                <div class="wp-block-column"></div>
                <div class="wp-block-cover has-background-dim">
                  <img class="wp-block-cover__image-background" style={{objectFit: 'fill'}} alt="" src={this.state.event.image} />
                  <div class="wp-block-cover__inner-container">
                    <div class="wp-block-buttons">
                      <div class="wp-block-button has-custom-width wp-block-button__width-100 is-style-fill">
                      { this.state.eventState == 2?
                          <a href="/meeting"  class="wp-block-button__link has-vivid-green-cyan-background-color has-background"
                          target="_blank">
                              <span class="has-inline-color has-white-color"><strong>{this.state.eventTag}</strong></span>
                          </a>
                          :
                          <><a class="wp-block-button__link has-vivid-green-cyan-background-color has-background"
                                onClick={e => this.handleBooking(e)}>
                                <span class="has-inline-color has-white-color"><strong>{this.state.eventTag}</strong></span>
                              </a>
                              <Modal show={this.state.bookingModal} handleClose={e => this.modalClose(e)}>
                                  <div className="form-group">
                                    <h2 className="title">Event Booking Confirmation</h2>
                                  </div>
                                  <div className="form-group">
                                    <h5>Event Name: {this.state.event.eventName}</h5>
                                  </div>
                                  <div className="form-group">
                                    <h5>Event Price: {this.state.event.price} {this.state.event.currency}</h5>
                                  </div>
                                  <div className="form-group">
                                    <h5>Enter Promocode:</h5>
                                    <input type="text" className="form-control" value={this.state.modalInputName}
                                      name="modalInputName" onChange={e => this.handleChange(e)} />
                                  </div>
                                  <div className="form-group">
                                    <h5>Final Price: {this.state.price} {this.state.event.currency}</h5>
                                  </div>
                                  <div className="form-group">
                                    <button type="button" className="save saveButton" onClick={e => this.handleSubmit(e)}>Make Payment</button>
                                  </div>
                                </Modal>
                                </>                         
                      }
                      {this.state.eventState == 4 && this.state.owner?
                        <a class="wp-block-button__link has-vivid-red-background-color has-background"
                          onClick={e => this.handleCancelEvent(e)}>
                          <span class="has-inline-color has-white-color"><strong>Cancel Event</strong></span>
                        </a>
                        : <></>                      

                      }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="wp-block-column is-vertically-aligned-center" style={{width:"66.66%"}}>
              <p class="has-large-font-size">{this.state.event.eventName}</p>
                <hr class="wp-block-separator"/>
                  <div class="wp-block-columns">
                    <div style={{width:"400px"}}>
                      <div class="wp-block-media-text__content">
                        <p>{this.state.event.description}</p>
                      </div>
                    </div>
                    <div class="wp-block-columns eventBox">
                      <div className="eventDisplay">
                        <div>
                          <img style={{width: 50, height: 50}} src="/images/calendar.png" />
                          <a className="button blue" style={{width: 300, height: 50, color: 'white', fontSize: 'large'}}>
                              {this.state.event.displayDate}
                          </a>
                        </div>
                      </div>   
                      <div className="eventDisplay">
                        <div>
                          <img style={{width: 50, height: 50}} src="/images/time.png" />
                          <a className="button purple" style={{width: 300, height: 50, color: 'white', fontSize: 'large'}}>
                            {this.state.event.startTime} - {this.state.event.eventDuration} Minutes
                          </a>
                        </div>
                      </div>   
                      <div className="eventDisplay">
                        <div>
                          <img style={{width: 50, height: 50}} src="/images/timezone.png" />
                          <a className="button yellow" style={{width: 300, height: 50, color: 'white', fontSize: 'large'}}>
                              {this.state.event.eventTimeZone}
                          </a>
                        </div>
                      </div>  
                      <div className="eventDisplay">
                        <div>
                          <img style={{width: 50, height: 50}} src="/images/ticket.png" />
                          <a className="button green" style={{width: 300, height: 50, color: 'white', fontSize: 'large'}}>
                            {this.state.event.price}  {this.state.event.currency}
                          </a>
                        </div>
                      </div>   
                    </div>
                  </div>
                  <hr class="wp-block-separator"/>
              </div>
            </div>
            <hr class="wp-block-separator"/>
          </div>
    
          {/* <div class="post-comments">
	        <div class="comments-form">
              <div class="comment-form">
     		    <div id="respond" class="comment-respond"> */}
		            {/* <h3 id="reply-title" class="comment-reply-title">Leave a Reply <small>
                        <a rel="nofollow" id="cancel-comment-reply-link" href="/indian-cook-show/#respond" style="display:none;">Cancel reply</a>
                        </small></h3> */}
                    {/* <h3 id="reply-title" class="comment-reply-title">Leave a Reply</h3>
                    <form action="https://vcanmeet.com/wp-comments-post.php" method="post" id="commentform" class="comment-form">
                      <p class="comment-notes"><span id="email-notes">Your email address will not be published.</span> Required fields are marked <span class="required">*</span></p>
                      <p class="comment-form-comment">
                        <label for="comment">Comment</label> 
                        <textarea id="comment" name="comment" cols="45" rows="8" maxlength="65525" required="required">
                        </textarea>
                      </p>
                      <p class="comment-form-author">
                        <label for="author">Name <span class="required">*</span></label> 
                        <input id="author" name="author" type="text" value="" size="30" maxlength="245" required='required' />
                      </p>
                      <p class="comment-form-email">
                        <label for="email">Email <span class="required">*</span></label> 
                        <input id="email" name="email" type="text" value="" size="30" maxlength="100" aria-describedby="email-notes" required='required' />
                      </p>
                      <p class="comment-form-url"><label for="url">Website</label> <input id="url" name="url" type="text" value="" size="30" maxlength="200" /></p>
                      <p class="comment-form-cookies-consent"><input id="wp-comment-cookies-consent" name="wp-comment-cookies-consent" type="checkbox" value="yes" /> <label for="wp-comment-cookies-consent">Save my name, email, and website in this browser for the next time I comment.</label></p>
                      <p class="form-submit"><input name="submit" type="submit" id="submit" class="button blue" value="Post Comment" /> <input type='hidden' name='comment_post_ID' value='274' id='comment_post_ID' />
                      <input type='hidden' name='comment_parent' id='comment_parent' value='0' />
                      </p>
                    </form>	
                </div>
	          </div>
            </div>
          </div> */}
        </div>  
      </div>
      </div>
    </>
    );
  }     
}