import React from 'react';
import { API } from 'aws-amplify';
import {NotificationManager} from 'react-notifications';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import moment from 'moment';

import Modal from "./BookModal";
import { composeDynamic } from 'styletron-react';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      event: {},
      owner: true,
      userLoggedIn: "",
      hasBooked: false,
      joinEvent: false,
      bookingModal: false,
      code: "",
      modalInputName: "",
      price: ""
    }
  }

  async componentDidMount() {
    var localUser = localStorage.getItem('user');
    var user = {};

    if(localUser === null || localUser === "") {
    } else {
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

    if(user.id !== null) {
      API.get('booking','/booking/'+ even.id + '/' + user.id)
      .then(data2 => {
        if(data2.error) {
          alert(data2.error)
        }
        if(data2.body) {
          let eventList = JSON.parse(data2.body);
          if (eventList && eventList.length > 0)
            this.setState({hasBooked: true});
        }     
      })
      .catch(error => {
        alert(error)
      })
    }

    const data = await API.get('event','/event/view/' + even.userId + '/' + even.id)
    if(data.error) {
      alert(data.error)
      return;
    }
    let eventList = JSON.parse(data.body);
    if(eventList && eventList.length > 0) {
      this.setState({event: eventList[0]});
      this.state.price = this.state.event.price;
      localStorage.setItem("event", JSON.stringify(eventList[0]));
      // alert(JSON.stringify(this.state.event));

      // alert(new Date().toLocaleString())
      // alert(new Date().toString())

      var momentObj = moment(this.state.event.eventDate + this.state.event.startTime, 'YYYY-MM-DDLT');

      // conversion
      //var startTime = momentObj.format('YYYY-MM-DDTHH:mm');
      var startTime = momentObj.subtract(5, 'minutes').format('YYYY-MM-DDTHH:mm');
      var endTime = momentObj.add(this.state.event.eventDuration + 5, 'minutes').format('YYYY-MM-DDTHH:mm');
      var currentTime = moment().utcOffset('+05:30').format('YYYY-MM-DDTHH:mm');

      var jointime = moment(currentTime).isBetween(startTime,endTime);
      if(jointime && (this.state.owner || this.state.hasBooked))
        this.setState({joinEvent: true});

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
                        { this.state.joinEvent?
                          <a href="/meeting"  class="wp-block-button__link has-vivid-green-cyan-background-color has-background"
                          target="_blank">
                              <span class="has-inline-color has-white-color"><strong>Join Meeting</strong></span>
                          </a>
                          :
                          <>
                          { this.state.owner?
                            <a href="/createEvent" class="wp-block-button__link has-vivid-green-cyan-background-color has-background">
                              <span class="has-inline-color has-white-color"><strong>Edit Event</strong></span>
                            </a>
                            : 
                            <>
                            { this.state.hasBooked?
                            <div>
                              <a class="wp-block-button__link has-vivid-cyan-blue-background-color has-background">
                                  <span class="has-inline-color has-white-color"><strong>Booking Done</strong></span>
                              </a>
                              </div>
                              :
                            <>
                              <a href="#"  class="wp-block-button__link has-vivid-green-cyan-background-color has-background"
                              onClick={e => this.modalOpen(e)}>
                                  <span class="has-inline-color has-white-color" ><strong>Book Now</strong></span>
                              </a>
                              <Modal show={this.state.bookingModal} handleClose={e => this.modalClose(e)}>
                                <div className="form-group">
                                  <h2 className="title" >Event Booking Confirmation</h2>
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
                                        name="modalInputName" onChange={e => this.handleChange(e)}/>
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
                            </>
                          }
                          </>
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
                              {this.state.event.eventDate}
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
                              {this.state.event.timeZone}
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