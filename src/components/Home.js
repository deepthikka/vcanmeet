import React from 'react';
import { API } from 'aws-amplify';

const eventMap = [0, 1, 2];

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      categories: []
    }
  }

  async componentDidMount() {
    const data = await API.get('category','/category/limit')
    if(data.error) {
      alert(data.error)
      return;
    }
    let cat = JSON.parse(data.body);
    this.setState({categories: cat});
  }
  
  render(){

    const Event = props => (
    <div className="blog-postcol cp4cols">
      <div className="post-content">
        <a >
          <img className="eventImg" src={props.img} />
        </a>
        <div className="row_345">
          <h3 className="blog-title">
            <a rel="bookmark">{props.title}</a>
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

    const Category = props => (
      <div className="portfolio-cards-projectcol cp4cols cp6cols-tablet"> 
        <div className="portfolio-cards-projectcard"> 
          <div className="contentswap-effect ContentSwap104" hover-fx="ContentSwap104" id="ContentSwap104" is-hovered="1"> 
            <div className="ContentSwap104_content initial-image">
              <img className="portfolio-cards-projectimg" data-size="1200x800" src={props.img}></img>
            </div> 
            <div className="overlay content-style">
            </div> 
            <div className="swap-inner content-style" > 
              <div className="ContentSwap104-center"> 
                <a href="#" target="_self" rel="noopener">
                  <i data-cp-fa="true" className="portfolio-card-icon fa fa-search"></i>
                </a> 
              </div> 
            </div> 
          </div> 
          <div className="portfolio-cards-projectinfo"> 
            <div className="portfolio-cards-projnamecol" data-type="column"> 
              <a href="#" className="portfolio-cards-projlink" target="_self" rel="noopener">
                <h4 className="portfolio-cards-projtitle">{props.title}</h4>
              </a> 
            </div> 
          </div> 
        </div> 
      </div> 
    );

    var categoryElements = [];
    if(this.state.categories) {
      let length = 3;
      if(this.state.categories.length < 3)
        length = this.state.categories.length;

      for(var i=0; i<length; i++) {
        categoryElements.push (
          <Category img={this.state.categories[i].Image} title ={this.state.categories[i].Title}/>
        );
      }
    }

    var eventElements = [];
    if(this.state.events) {
      for(var i=0; i<this.state.events.length; i++) {
        eventElements.push (
          <Event img={this.state.events[i].img} title={this.state.events[i].title} 
                author={this.state.events[i].author} date={this.state.events[i].date}/>
        );
      }
    }

    return (
      <>
      <div className="content">
      <div className="page-content">
        <div data-label="Portfolio" data-id="portfolio-cards-section" data-category="portfolio" className="portfolio-cards-section" id="portfolio-1" style={{backgroundColor: "rgb(246, 246, 246)"}}> 
            <div className="gridContainer"> 
              <div className="blog-textrow"> 
                <div className="blog-textcol dynamic-color" data-type="column"> 
                <h3 className="fontstyle">Checkout our Events &amp; Classes</h3>  
              </div>
            </div> 
            <div className="portfolio-cards-projectsro dark-text" data-type="row"> 
                {categoryElements}
            </div>
            <div className="blog-textcol"> 
                <a className="button blue" data-attr-shortcode="href:one_page_express_blog_link" href="/categoryList">SEE ALL CATEGORIES</a> 
              </div> 
          </div>
        </div>    

        <div id="latest-posts" style={{backgroundColor: "#ffffff"}} data-label="Latest posts" data-id="blog-section" data-events="latest_news" className="blog-section"> 
          <div className="gridContainer"> 
            <div className="blog-textrow"> 
              <div className="blog-textcol dynamic-color" data-type="column"> 
                <h3 className="fontstyle">UpComing Events</h3> 
                <p className="">Learn more from the your favourite youtubers and influencres interactively through video conference</p> 
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