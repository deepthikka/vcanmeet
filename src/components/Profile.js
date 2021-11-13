import React from 'react';
import { API } from 'aws-amplify';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      events: [],
      videos: []
    }
  }

  async componentDidMount() {
    localStorage.setItem('event', "");
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({
      user: user
    })
    //alert(JSON.stringify(user))
    if(user.youtubeid) {
      
      const currentChannelId = user.youtubeid;
      const apikey = "AIzaSyB74HifExjAeP3uojTJzp-fJU2IVwu0fR8";

      var finalUrl = 'https://www.googleapis.com/youtube/v3/search?key=' + apikey + '&channelId='+ currentChannelId+ '&part=snippet,id&order=date&maxResults=4';
      const data = await fetch(finalUrl).then(response => response.json());
      this.setState({
        videos: data.items
      })
    }

    const data = await API.get('event','/event/' + user.id)
    if(data.error) {
      alert(data.error)
      return;
    }
    let eventList = JSON.parse(data.body);
    this.setState({events: eventList});
    // alert(data.body)
  }

  eventClick(event) {
    localStorage.setItem("event", JSON.stringify(event));
    window.location.href = '/event';
  }
  

  render(){
    const Event = props => (
    <div id="post-117" className="blog-postcol cp4cols">
      <div className="post-content">
        <a >
          <img className="eventImg" src={props.img} />
        </a>
        <div className="row_345">
          <h3 className="blog-title">
            {/* <a href={'/event/' + props.id} rel="bookmark" >{props.title}</a> */}
            <a rel="bookmark" onClick={() => this.eventClick(props)}>{props.title}</a>
          </h3>
          <hr className="blog-separator"></hr>
          <div className="post-header">
              <i className="font-icon-post fa fa-user"></i>
              {/* Deepthi - On click author name redirect to Author profile */}
              <a href="#" rel="author">{props.author}</a>    
              <i className="font-icon-post fa fa-calendar"></i>
              <span className="span12">{props.date}</span>
          </div>
        </div>
      </div>
    </div>      
    );

    var eventElements = [];
    if(this.state.events) {
      for(var i=0; i<this.state.events.length; i++) {
        eventElements.push (
          <Event img={this.state.events[i].image} title={this.state.events[i].eventName} 
                author={this.state.events[i].userName} date={this.state.events[i].eventDate}
                id={this.state.events[i].eventId} userId={this.state.events[i].userId}/>
        );
      }
    }
    
    const VideoLink = props => (
      <div id="post-117" className="blog-postcol cp3cols">
        <div className="post-content">
          <a >
            <iframe src={props.url} width="100%" className="img-fluid rounded shadow-sm"></iframe>
          </a>
        </div>
      </div>      
      );

    var videoElements = [];
    if(this.state.videos && this.state.videos.length > 0) {
      for(var i=0; i<this.state.videos.length; i++) {
        var url = 'https://www.youtube.com/embed/' + this.state.videos[i].id.videoId;
        videoElements.push (
          <VideoLink url={url}/>
        );
      }
    }

    return (
      <>
      <div className="content">
        <div className="page-content"> 
          <div id="latest-posts" style={{backgroundColor: "#ffffff"}} data-label="Latest posts" data-id="blog-section" data-events="latest_news" className="blog-section"> 
            <div className="gridContainer block1"> 
              <div className="profileblock">
                <img src={this.state.user.image} />
              </div>
              <div className="nameblock">
                <h3 className="fontstyle">{this.state.user.name}</h3>  
                <p className="descstyle">{this.state.user.description}</p>
                {/* <h4 className="fontstyle">15 subscribers</h4>   */}
              </div>
            </div>


          <div className="gridContainer"> 
            <hr className="wp-block-separator is-style-wide"/>
            <div className="blog-postsrow dark-text" data-type="row" data-dynamic-columns="one_page_express_latest_news_columns" data-content-shortcode="one_page_express_latest_news">            
              <div className="blog-postcol cp3cols">
                <div>
                  <div className="row_345">
                  <img style={{width: 80, height: 80, borderRadius: "50%"}} src="/images/profile.png" />
                    <a className="button blue small" href="/updateProfile">
                      <span data-theme="one_page_express_latest_news_read_more">Edit Profile</span>
                    </a>
                  </div>
                </div>
              </div>      
              <div className="blog-postcol cp3cols">
                <div>
                  <div className="row_345">
                    <img style={{width: 80, height: 80, borderRadius: "50%"}} src="/images/event.png" />
                    <a className="button green small" href="/createEvent">
                      <span data-theme="one_page_express_latest_news_read_more">Create Event</span>
                    </a>
                  </div>
                </div>
              </div>      
              <div className="blog-postcol cp3cols">
                <div>
                  <div className="row_345">
                    <img style={{width: 80, height: 80, borderRadius: "50%"}} src="/images/review.png" />
                    <a className="button yellow small" href="/eventList">
                      <span data-theme="one_page_express_latest_news_read_more">View Reviews</span>
                    </a>
                  </div>
                </div>
              </div>      
              <div className="blog-postcol cp3cols">
                <div>
                  <div className="row_345">
                  <img style={{width: 80, height: 80, borderRadius: "50%"}} src="/images/security2.png" />
                    <a className="button purple small">
                      <span data-theme="one_page_express_latest_news_read_more">Security Setup</span>
                    </a>
                  </div>
                </div>
              </div>  
              
              <hr className="wp-block-separator is-style-wide"/>

              {this.state.user && this.state.user.youtubeid ? (
                <>
                <h4>YouTube Channel</h4>
                <p><a href={'https://www.youtube.com/channel/'+ this.state.user.youtubeid}>Link:   https://www.youtube.com/channel/{this.state.user.youtubeid}</a>
                </p>
                <div className="blog-postsrow" data-type="row">
                  {videoElements}
                </div>
                </>
              ) : 
              <h4></h4>
              } 
            </div> 
            <hr className="wp-block-separator is-style-wide"/>
          </div>
        
          <div className="gridContainer"> 
            <div className="blog-textrow"> 
              <div className="blog-textcol dynamic-color" data-type="column"> 
                <h3 className="fontstyle">Latest Events</h3> 
              </div> 
            </div> 
            <div className="blog-postsrow dark-text" data-type="row" data-dynamic-columns="one_page_express_latest_news_columns" data-content-shortcode="one_page_express_latest_news">            
              {eventElements}
            </div> 
            <div className="blog-textcol"> 
              {/* Deepthi - Redirect on click to All Events page */}
              <a className="button blue" data-attr-shortcode="href:one_page_express_blog_link" href="#">SEE ALL EVENTS</a> 
            </div> 
          </div>
        </div> 
      </div>
      </div></>
    );
  }
}