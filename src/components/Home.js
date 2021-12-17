import React from 'react';
import { API } from 'aws-amplify';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      categories: []
    }
  }

  async componentDidMount() {
    //localStorage.setItem('event', "");

    API.get('category','/category/limit')
    .then(data => {
      if(data.error) {
        alert(data.error)
        return;
      }      
      
      let cat = JSON.parse(data.body);
      this.setState({categories: cat});
    })

    await API.get('event','/event')
    .then(data1 => {
      if(data1.error) {
        alert(data1.error)
        return;
      }
      let eventList = JSON.parse(data1.body);
      this.setState({events: eventList});
    })
  }

  eventClick(event) {
    localStorage.setItem("event", JSON.stringify(event));
    window.location.href = '/event';
  }
  
  render(){

    const Event = props => (
      <div id="post-117" className="blog-postcol cp4cols">
        <div className="post-content">
          <a onClick={() => this.eventClick(props.data)}>
            <img className="eventImg" src={props.data.image} />
          </a>
          <div className="row_345">
            <h3 className="blog-title">
              <a rel="bookmark" onClick={() => this.eventClick(props.data)}>{props.data.eventName}</a>
            </h3>
            <hr className="blog-separator"></hr>
            <div className="post-header">
                <i className="font-icon-post fa fa-user"></i>
                <a href={'/profile/' + props.data.userId} rel="author">{props.data.userName}</a>  
                <i className="font-icon-post fa fa-calendar"></i>
                <span className="span12">{props.data.displayDate}</span>
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
              <a href={'/eventList/category/' + props.name}>
              <img className="portfolio-cards-projectimg" data-size="1200x800" src={props.img}></img>
              </a>
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
              <a href={'/eventList/category/' + props.name} className="portfolio-cards-projlink" target="_self" rel="noopener">
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
          <Category img={this.state.categories[i].Image} title ={this.state.categories[i].Title}
                    name={this.state.categories[i].Name}/>
        );
      }
    }

    var eventElements = [];
    if(this.state.events) {
      let length = 3;
      if(this.state.events.length < 3)
        length = this.state.events.length;
      for(var i=0; i<length; i++) {
        eventElements.push (
          <Event data={this.state.events[i]}/>
        );
      }
    }

    return (
      <>
      <div className="content">
      <div className="page-content">
        <div data-label="Portfolio" style={{backgroundColor: "#ffffff"}}  data-id="portfolio-cards-section" data-category="portfolio" className="portfolio-cards-section" id="portfolio-1" style={{backgroundColor: "rgb(246, 246, 246)"}}> 
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
                <p className="">Learn more from the your favourite youtubers and influencers interactively through video conference</p> 
              </div> 
            </div> 
            <div className="blog-postsrow dark-text" data-type="row" data-dynamic-columns="one_page_express_latest_news_columns" data-content-shortcode="one_page_express_latest_news">            
              {eventElements}
            </div> 
            <div className="blog-textcol"> 
              <a className="button blue" data-attr-shortcode="href:one_page_express_blog_link" href="/eventList">SEE ALL EVENTS</a> 
            </div> 
          </div>
        </div>
        
    </div>
      </div></>
    );
  }
}