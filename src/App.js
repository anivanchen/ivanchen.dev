import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import LoadingScreen from './components/LoadingScreen';
import DotRing from './components/DotRing/DotRing';

function App() {

  // Preloading Page

  const [loading, setLoading] = useState(true);

  useEffect(() => {
      setTimeout(() => setLoading(false), 2750)
  }, [])

  // Set Theme

  function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
  }

  function toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-dark'){
        setTheme('theme-light');
    } else {
        setTheme('theme-dark');
    }
  }
  (function () {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-dark');
    } else {
        setTheme('theme-light');
    }
  })();

  return (
    <>
      {loading === false ? (

        <Fragment>
        <DotRing />
        <div className="opening-wrapper">
          <button className="right mode" onClick={toggleTheme}><i className="bi bi-brightness-high-fill dark"></i></button>
            <div className="opening-container">
  
            <div className="text-container">
              <h3>Hi, I'm <a className="link" href="https://github.com/anivanchen">Ivan Chen</a>, a current sophomore at <a className="link" href="https://stuy.enschool.org/">Stuyvesant High School</a>.</h3>
              <p>At Stuy, I am in the class of 2024. I enjoy computer science and mathematics. I love learning new things and starting new <a className="link" href="#projects">projects</a>, especially those that challenge me and introduce novel topics. Learning never ends, and there's always more for me to explore.</p>
            </div>
  
            <a className="social-media-button dark" href="https://linkedin.com/in/ivan-chen-9b85481b6"><i class="bi bi-linkedin"></i></a>
            <a className="social-media-button dark" href="https://github.com/anivanchen"><i class="bi bi-github"></i></a>
            <a className="social-media-button dark" href="/"><i class="bi bi-file-earmark"></i></a>
          
          </div>
        </div>

          <div className="gallery-wrapper">
            <h1 className="dark">My Projects</h1>
            <div className="gallery-item">
              <div className="text-container" id="gallery">
                <h2>anivanchen.github.io</h2>
                <a className="social-media-button" href="https://github.com/anivanchen/anivanchen.github.io"><i class="bi bi-github"></i></a>
                <p>This is the website you are currently on right now. During quarantine, I self-taught myself web development and programming with all the extra time I had. This website a product of my web development journey. </p>
                <div className="techs-container">
                  <a className="tech-link" href="https://www.javascript.com/"><i className="devicon-javascript-plain" /></a>
                  <a className="tech-link" href="https://nodejs.org/en/"><i className="devicon-nodejs-plain" /></a>
                  <a className="tech-link" href="https://reactjs.org/"><i className="devicon-react-plain" /></a>
                </div>
              </div>
            </div>
            <div className="gallery-item">
              <div className="text-container" id="gallery">
                <h2>file-server</h2>
                <a className="social-media-button" href="https://github.com/anivanchen/file-server"><i class="bi bi-github"></i></a>
                <p>A simple file server with authentication built using the PERN (PostgreSQL, Express, React, Node.js) stack. </p>
                <div className="techs-container">
                  <a className="tech-link" href="https://www.javascript.org/"><i className="devicon-javascript-plain" /></a>
                  <a className="tech-link" href="https://nodejs.org/en/"><i className="devicon-nodejs-plain" /></a>
                  <a className="tech-link" href="https://reactjs.org/"><i className="devicon-react-plain" /></a>
                  {/* <a className="tech-link" href="https://expressjs.com/"><i className="devicon-express-plain" /></a> */}
                  <a className="tech-link" href="https://postgresql.org/"><i className="devicon-postgresql-plain" /></a>
                </div>
              </div>
            </div>
            <div className="gallery-item">
              <div className="text-container" id="gallery">
                <h2>algorithms</h2>
                <a className="social-media-button" href="https://github.com/anivanchen/algorithms"><i class="bi bi-github"></i></a>
                <p>This project contains my implementations of algorithms in JavaScript and Python. </p>
                <div className="techs-container">
                  <a className="tech-link" href="https://www.javascript.org/"><i className="devicon-javascript-plain" /></a>
                  <a className="tech-link" href="https://www.python.com/"><i className="devicon-python-plain" /></a>
                </div>
              </div>
            </div>
          </div>
  
        <div className="footer">
  
          <a className="cursor-affector social-media-button" href="https://linkedin.com/in/ivan-chen-9b85481b6"><i class="bi bi-linkedin"></i></a>
          <a className="cursor-affector social-media-button" href="https://github.com/anivanchen"><i class="bi bi-github"></i></a>
          <a className="cursor-affector social-media-button" href="/"><i class="bi bi-file-earmark"></i></a>
    
        </div>
      </Fragment>

      ) : (
          <LoadingScreen />
      )
      }
    </>
  )
}

export default App;