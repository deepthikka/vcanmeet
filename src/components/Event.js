import React from 'react';
import { API } from 'aws-amplify';
import {NotificationManager} from 'react-notifications';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      event: {}
    }
  }

  async componentDidMount() {
    // alert(this.props.match.params.id);
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({
      user: user
    })

    const data = await API.get('event','/event/view/' + user.id + '/' + this.props.match.params.id)
    if(data.error) {
      alert(data.error)
      return;
    }
    let eventList = JSON.parse(data.body);
    if(eventList && eventList.length > 0) {
      this.setState({event: eventList[0]});
      alert(JSON.stringify(this.state.event));
    } else {
      NotificationManager.error('Event doesnt Exist', 'Error!');
      window.location.href = '/profile';
    }
  }

  render(){
    return (
      <>
      <div id="page-content" class="page-content eventBackground">
        <div class="gridContainer">
          <div id="post-274" class="post-274 page type-page status-publish has-post-thumbnail hentry">
            <div>
              <div class="wp-block-columns">
              <div class="wp-block-columns" style={{width:"33.33%"}}>
                {/* <div class="wp-block-column" style="flex-basis:33.33%"> */}
                <div class="wp-block-column"></div>
                  <div class="wp-block-cover has-background-dim">
                    <img class="wp-block-cover__image-background" alt="" src={this.state.event.image} />
                    <div class="wp-block-cover__inner-container">
                      <div class="wp-block-buttons">
                        <div class="wp-block-button has-custom-width wp-block-button__width-100 is-style-fill">
                          <a class="wp-block-button__link has-vivid-green-cyan-background-color has-background">
                            <span class="has-inline-color has-white-color"><strong>Book Now</strong></span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div class="wp-block-column is-vertically-aligned-center" style="flex-basis:66.66%"> */}
                <div class="wp-block-column is-vertically-aligned-center" style={{width:"66.66%"}}>
                <p>{this.state.user.description}</p>

                  <hr class="wp-block-separator is-style-wide"/>
                  <div class="wp-block-media-text alignwide has-media-on-the-right is-stacked-on-mobile">
                    <figure class="wp-block-media-text__media">
                      <img loading="lazy" width="1024" height="684" src="https://vcanmeet.com/wp-content/uploads/2021/10/Picture2-1024x684.png" alt="" class="wp-image-284 size-full" srcset="https://vcanmeet.com/wp-content/uploads/2021/10/Picture2-1024x684.png 1024w, https://vcanmeet.com/wp-content/uploads/2021/10/Picture2-300x200.png 300w, https://vcanmeet.com/wp-content/uploads/2021/10/Picture2-768x513.png 768w, https://vcanmeet.com/wp-content/uploads/2021/10/Picture2-1536x1026.png 1536w, https://vcanmeet.com/wp-content/uploads/2021/10/Picture2-2048x1367.png 2048w, https://vcanmeet.com/wp-content/uploads/2021/10/Picture2-1618x1080.png 1618w" sizes="(max-width: 1024px) 100vw, 1024px" />
                    </figure><div class="wp-block-media-text__content">
                    <p class="has-large-font-size">{this.state.event.eventName}</p>
                    <p>{this.state.event.description}</p>
                    <p>{this.state.event.eventDate}</p>
                    <p>{this.state.event.startTime} - {this.state.event.duration}Hours</p>
                    <p>{this.state.event.price}  {this.state.event.currency}</p>
                  </div>
                </div>
                <div class="wp-block-buttons"></div>
                <hr class="wp-block-separator is-style-wide"/>
                {/* <p>{this.state.event.description}</p> */}
              </div>
            </div>
            <hr class="wp-block-separator"/>
          </div>
    
          <div class="post-comments">
	        <div class="comments-form">
              <div class="comment-form">
     		    <div id="respond" class="comment-respond">
		            {/* <h3 id="reply-title" class="comment-reply-title">Leave a Reply <small>
                        <a rel="nofollow" id="cancel-comment-reply-link" href="/indian-cook-show/#respond" style="display:none;">Cancel reply</a>
                        </small></h3> */}
                    <h3 id="reply-title" class="comment-reply-title">Leave a Reply</h3>
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
          </div>
        </div>  
      </div>
      </div>
    </>
    );
  }     
}