import React from 'react';
import { API } from 'aws-amplify';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
      };

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
        for(var i=0; i<this.state.categories.length; i++) {
          categoryElements.push (
            <Category img={this.state.categories[i].Image} title ={this.state.categories[i].Title}
            name={this.state.categories[i].Name}/>
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
            </div>
          </div>    
        </div>
      </div>
    </>
  
    );
  }
}