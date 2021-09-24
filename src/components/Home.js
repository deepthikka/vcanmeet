import React from 'react';

const eventMap = [0, 1, 2];
const categoryMap = [0, 1, 2, 3, 4, 5];

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
      categories: [
        {
          img: "/images/fitness.jpg",
          title : "Fitness Events"
        },
        {
          img: "/images/legal.jpg",
          title : "Legal Advice"
        },
        {
          img: "/images/dancing.jpg",
          title : "Dance Events"
        },
        {
          img: "/images/guitar.jpg",
          title : "Guitar Classes"
        },
        {
          img: "/images/coding.jpg",
          title : "Coding Support/Classes"
        },
        {
          img: "/images/cooking.jpg",
          title : "Cooking Classes"
        }
      ]
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
            <a rel="bookmark">{props.title}</a>
          </h3>
          <a className="button blue small">
            <span data-theme="one_page_express_latest_news_read_more">Read more</span>
          </a>
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

    return (
      <>
      <div className="content">
      <div className="page-content">
        <div id="latest-posts" style={{backgroundColor: "#ffffff"}} data-label="Latest posts" data-id="blog-section" data-events="latest_news" className="blog-section"> 
          <div className="gridContainer"> 
            <div className="blog-textrow"> 
              <div className="blog-textcol dynamic-color" data-type="column"> 
                <h2 className="">UpComing Events</h2> <p className="">Learn more from the your favourite youtubers and influencres interactively through video conference</p> 
              </div> 
            </div> 
            <div className="blog-postsrow dark-text" data-type="row" data-dynamic-columns="one_page_express_latest_news_columns" data-content-shortcode="one_page_express_latest_news">            
              {eventMap.map(i => {
                return <Event img={this.state.events[i].img} title={this.state.events[i].title} author={this.state.events[i].author} date={this.state.events[i].date}/>
              })};
            </div> 
            <div className="blog-textcol"> 
              {/* Deepthi - Redirect on click to All Events page */}
              <a className="button blue" data-attr-shortcode="href:one_page_express_blog_link" href="#">SEE ALL EVENTS</a> 
            </div> 
          </div>
        </div>
        
        <div data-label="Portfolio" data-id="portfolio-cards-section" data-category="portfolio" className="portfolio-cards-section" id="portfolio-1" style={{backgroundColor: "rgb(246, 246, 246)"}}> 
          <div className="gridContainer"> <div className="portfolio-cards-textcol dynamic-color" data-type="column"> 
            <h2 className="">Checkout our Events &amp; Classes</h2>  
          </div> 
          <div className="portfolio-cards-projectsro dark-text" data-type="row"> 
          {categoryMap.map(i => {
                return <Category img={this.state.categories[i].img} title ={this.state.categories[i].title}/>
              })};
      </div>
    </div>
    </div>    
    </div>
      </div></>
    );
  }
}