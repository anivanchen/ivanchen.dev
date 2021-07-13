import React, { Fragment } from 'react';
import './App.css';

function App() {

  var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };

  TxtType.prototype.tick = function() {
      var i = this.loopNum % this.toRotate.length;
      var fullTxt = this.toRotate[i];

      if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

      var that = this;
      var delta = 200 - Math.random() * 100;

      if (this.isDeleting) { delta /= 2; }

      if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
      }

      setTimeout(function() {
      that.tick();
      }, delta);
  };

  window.onload = function() {
      var elements = document.getElementsByClassName('typewrite');
      for (var i=0; i<elements.length; i++) {
          var toRotate = elements[i].getAttribute('data-type');
          var period = elements[i].getAttribute('data-period');
          if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
          }
      }
      // INJECT CSS
      var css = document.createElement("style");
      css.type = "text/css";
      css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #3A3B40}";
      document.body.appendChild(css);
  };

  return (
    <Fragment>
      <div className="wrapper">
        {/* <button className="mode dark right" onClick=""><i class="bi bi-brightness-high-fill"></i></button> */}
        <div className="container">

          <a class="typewrite"
            data-period="2000"
            data-type='[ 
              "Hi, Im Ivan",
              "Im a programmer",
              "The Languages/Technologies I use are",
              "Javascript and Python",
              "SQL and PostgreSQL",
              "React.js, Node.js, and Express.js",
              "I use Git and Figma",
              "To improve my workflow"
            ]'
          />

          <div className="text-container">
            <h3>Hi, I'm <a className="link" href="#projects">Ivan Chen</a>, a current sophomore at <a className="link" href="https://stuy.enschool.org/">Stuyvesant High School</a>.</h3>
            <p>At Stuy, I am in the class of 2024. I enjoy computer science and mathematics. I love learning new things and starting new <a className="link" href="https://github.com/anivanchen">projects</a>, especially those that challenge me and introduce novel topics. Learning never ends, and there's always more for me to explore.</p>
          </div>

          <a className="social-media-button dark" href="https://linkedin.com/in/ivan-chen-9b85481b6"><i class="bi bi-linkedin"></i></a>
          <a className="social-media-button dark" href="https://github.com/anivanchen"><i class="bi bi-github"></i></a>
          <a className="social-media-button dark" href=""><i class="bi bi-file-earmark"></i></a>
        
        </div>
      </div>
      <div className="footer">

        <a className="social-media-button" href="https://linkedin.com/in/ivan-chen-9b85481b6"><i class="bi bi-linkedin"></i></a>
        <a className="social-media-button" href="https://github.com/anivanchen"><i class="bi bi-github"></i></a>
        <a className="social-media-button" href=""><i class="bi bi-file-earmark"></i></a>
  
      </div>
    </Fragment>
  )
}

export default App;