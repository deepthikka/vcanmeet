import React from 'react';
import { API } from 'aws-amplify';

const eventMap = [0, 1, 2];

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {name: "", image: ""},
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
        {
          url:"https://www.youtube.com/embed/UWY1OnCXPB0"
        },
        {
          url:"https://www.youtube.com/embed/UWY1OnCXPB0"
        },
        {
          url:"https://www.youtube.com/embed/UWY1OnCXPB0"
        },
        {
          url:"https://www.youtube.com/embed/UWY1OnCXPB0"
        },

      ]
    }
  }

  async componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({
      user: user
    })
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
    if(this.state.videos) {
      for(var i=0; i<this.state.videos.length; i++) {
        videoElements.push (
          <VideoLink url={this.state.videos[i].url}/>
        );
      }
    }

    return (
      <>
      <div className="content">
        <div className="page-content"> 
          <div id="latest-posts" style={{backgroundColor: "#ffffff"}} data-label="Latest posts" data-id="blog-section" data-events="latest_news" className="blog-section"> 
            <div className="gridContainer block1"> 
              <div class="profileblock">
                <img className="center" width="150" height="150" src={this.state.user.image} />
              </div>
              <div class="nameblock">
                <h3 className="fontstyle">{this.state.user.name}</h3>  
                <h4 className="fontstyle">15 subscribers</h4>  
              </div>
            </div>


          <div className="gridContainer"> 
            <hr class="wp-block-separator is-style-wide"/>
            <div className="blog-postsrow dark-text" data-type="row" data-dynamic-columns="one_page_express_latest_news_columns" data-content-shortcode="one_page_express_latest_news">            
              <div id="post-117" className="blog-postcol cp3cols">
                <div className="post-content">
                  <div className="row_345">
                    <img width="100" height="100" style={{borderRadius: "50%"}} src="/images/profile.png" />
                    <a className="button blue small">
                      <span data-theme="one_page_express_latest_news_read_more">Edit Profile</span>
                    </a>
                  </div>
                </div>
              </div>      
              <div className="blog-postcol cp3cols">
                <div className="post-content">
                  <div className="row_345">
                    <img width="100" height="100" style={{borderRadius: "50%"}} src="/images/event.png" />
                    <a className="button green small">
                      <span data-theme="one_page_express_latest_news_read_more">Create Event</span>
                    </a>
                  </div>
                </div>
              </div>      
              <div id="post-117" className="blog-postcol cp3cols">
                <div className="post-content">
                  <div className="row_345">
                    <img width="100" height="100" style={{borderRadius: "50%"}} src="/images/review.jpg" />
                    <a className="button yellow small">
                      <span data-theme="one_page_express_latest_news_read_more">View Reviews</span>
                    </a>
                  </div>
                </div>
              </div>      
              <div id="post-117" className="blog-postcol cp3cols">
                <div className="post-content">
                  <div className="row_345">
                    <img width="100" height="100" style={{borderRadius: "50%"}} src="/images/security.png" />
                    <a className="button purple small">
                      <span data-theme="one_page_express_latest_news_read_more">Security Setup</span>
                    </a>
                  </div>
                </div>
              </div>  
              
              <hr class="wp-block-separator is-style-wide"/>
              <h4>Description</h4>
              <p>Ridges n Roads is my Travel Vlog. In my Travel Journey I will discuss the places visited, cuisines tried and the culture experienced. In my Vlog, I have covered #Sydney weekends, Kerala Tourism, Dubai.</p>
              <h4>YouTube Link</h4>
              <p><a href="https://www.youtube.com/channel/UC4hpLJdRUQLh6e79XRT_L0g">https://www.youtube.com/channel/UC4hpLJdRUQLh6e79XRT_L0g</a></p>

              <div className="blog-postsrow" data-type="row">            
                {videoElements}
              </div> 
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