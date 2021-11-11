import React from 'react';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          eventList: [
            {
              img : "https://vcanmeet.com/wp-content/uploads/2021/11/yin-yoga-training-course.jpg",
              title : "Horoscope Reading",
              date: "Wed 17th Nov 21",
              time: "11:30",
              zone: "GST",
              duration: "30",
              description: "This is Yoga class for beginners and Lisa will teach basic Yogasana’s. Bring: Yoga mat and water bottle"
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
          ]
        }
      };

  async componentDidMount() {
  }

  render(){

    const Event = props => (
      <>
        <div class="wp-block-columns">
          <div class="wp-block-columns col1">
            <div class="wp-block-column">
              <p></p>
              <p>{props.date}</p>
              <p>{props.time} {props.zone}</p>
              <p>Duration : {props.duration} min</p>
              <div class="wp-block-buttons">
                <div class="wp-block-button is-style-fill">
                  <a class="wp-block-button__link has-black-color has-vivid-green-cyan-background-color has-text-color has-background">View</a>
                </div>
              </div>
            </div>
          </div>
          <div class="wp-block-columns col2">
            <div class="wp-block-column">
              <h4><strong>{props.title}</strong></h4>
              <p>{props.description} </p>
            </div>
          </div>
          <div class="wp-block-columns col3">
            <div class="wp-block-column">
              <p></p>
              <div class="wp-block-image is-style-rounded">
                <figure class="aligncenter size-full">
                  <img loading="lazy" width="600" height="400"
                    src={props.img} alt="" class="wp-image-294" sizes="(max-width: 600px) 100vw, 600px" />
                </figure>
              </div>  
            </div>
          </div>
        </div>
        <hr class="wp-block-separator has-text-color has-background has-vivid-cyan-blue-background-color has-vivid-cyan-blue-color is-style-wide" />
      </>
    );

    var eventElements = [];
    if(this.state.eventList) {
      for(var i=0; i<this.state.eventList.length; i++) {
        eventElements.push (
          <Event img={this.state.eventList[i].img} title={this.state.eventList[i].title} 
                date={this.state.eventList[i].date} time={this.state.eventList[i].time} 
                duration={this.state.eventList[i].duration} zone={this.state.eventList[i].zone}
                description={this.state.eventList[i].description}/>
        );
      }
    }

    return (
    <>
        <div id="page-content" class="page-content eventBackground">
          <div class="gridContainer">
            <div id="post-293" class="post-293 page type-page status-publish hentry">
              <div>  
                {eventElements}
              </div>
            </div>
          </div>
        </div>  
    </>
    );
  }
}