import React from 'react';
import { API } from 'aws-amplify';

const eventMap = [0, 1, 2];

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {name: "", image: "", youtubeLink: ""},
      events: [
        {
          img : "/images/horoscope.png",
          title : "Horoscope Reading",
          author:"Suvetha",
          date:"September 18, 2021"
        },
        {
          img : "/images/Tarot.png",
          title : "Tarot Card Reading",
          author:"Suvetha",
          date:"September 18, 2021"
        },
        {
          img : "/images/dancing.jpg",
          title : "Dancing Class",
          author:"Suvetha",
          date:"September 18, 2021"
        },
      ],
      videos: [
        // {
        //   url:"https://www.youtube.com/embed/UWY1OnCXPB0"
        // },
        // {
        //   url:"https://www.youtube.com/embed/UWY1OnCXPB0"
        // },
        // {
        //   url:"https://www.youtube.com/embed/UWY1OnCXPB0"
        // },
        // {
        //   url:"https://www.youtube.com/embed/UWY1OnCXPB0"
        // },

      ]
    }
  }

  async componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({
      user: user
    })
    if(user.profile.youtubeChannelID) {
      
      const currentChannelId = user.profile.youtubeChannelID;
      const apikey = "AIzaSyB74HifExjAeP3uojTJzp-fJU2IVwu0fR8";

      var finalUrl = 'https://www.googleapis.com/youtube/v3/search?key=' + apikey + '&channelId='+ currentChannelId+ '&part=snippet,id&order=date&maxResults=4';
      const data = await fetch(finalUrl).then(response => response.json());
      this.setState({
        videos: data.items
      })
    }
  }
  

  render(){
    const Event = props => (
    <div id="post-117" className="blog-postcol cp4cols">
      <div className="post-content">
        <a >
          <img width="400" height="200" src={props.img} />
        </a>
        <div className="row_345">
          <h3 className="blog-title">
            <a rel="bookmark" >{props.title}</a>
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
          <Event img={this.state.events[i].img} title={this.state.events[i].title} 
                author={this.state.events[i].author} date={this.state.events[i].date}/>
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
                <img className="center" width="150" height="150" src={this.state.user.image} />
              </div>
              <div className="nameblock">
                <h3 className="fontstyle">{this.state.user.name}</h3>  
                <h4 className="fontstyle">15 subscribers</h4>  
              </div>
            </div>


          <div className="gridContainer"> 
            <hr className="wp-block-separator is-style-wide"/>
            <div className="blog-postsrow dark-text" data-type="row" data-dynamic-columns="one_page_express_latest_news_columns" data-content-shortcode="one_page_express_latest_news">            
              <div id="post-117" className="blog-postcol cp3cols">
                <div className="post-content">
                  <div className="row_345">
                  <img style={{width: 100, height: 100, borderRadius: "50%"}} src="/images/profile.png" />
                    <a className="button blue small" href="/updateProfile">
                      <span data-theme="one_page_express_latest_news_read_more">Edit Profile</span>
                    </a>
                  </div>
                </div>
              </div>      
              <div className="blog-postcol cp3cols">
                <div className="post-content">
                  <div className="row_345">
                    <img style={{width: 100, height: 100, borderRadius: "50%"}} src="/images/event.png" />
                    <a className="button green small">
                      <span data-theme="one_page_express_latest_news_read_more">Create Event</span>
                    </a>
                  </div>
                </div>
              </div>      
              <div className="blog-postcol cp3cols">
                <div className="post-content">
                  <div className="row_345">
                    <img style={{width: 100, height: 100, borderRadius: "50%"}} src="/images/review.jpg" />
                    <a className="button yellow small">
                      <span data-theme="one_page_express_latest_news_read_more">View Reviews</span>
                    </a>
                  </div>
                </div>
              </div>      
              <div className="blog-postcol cp3cols">
                <div className="post-content">
                  <div className="row_345">
                  <img style={{width: 100, height: 100, borderRadius: "50%"}} src="/images/security.png" />
                    <a className="button purple small">
                      <span data-theme="one_page_express_latest_news_read_more">Security Setup</span>
                    </a>
                  </div>
                </div>
              </div>  
              
              <hr className="wp-block-separator is-style-wide"/>
              <h4>Description</h4>
              <p>Ridges n Roads is my Travel Vlog. In my Travel Journey I will discuss the places visited, cuisines tried and the culture experienced. In my Vlog, I have covered #Sydney weekends, Kerala Tourism, Dubai.</p>
              {this.state.user.profile && this.state.user.profile.youtubeChannelID ? (
                <>
                <h4>YouTube Link</h4>
                <p><a href={'https://www.youtube.com/channel/'+ this.state.user.profile.youtubeChannelID}>https://www.youtube.com/channel/{this.state.user.profile.youtubeChannelID}</a>
                </p>
                <div className="blog-postsrow" data-type="row">
                  {videoElements}
                </div>
                </>
              ) : 
              <h4></h4>
              } 
            </div> 
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