import React, { Fragment } from 'react';

function Projects() {
    return (
      <Fragment>
        <div className="gallery-wrapper">
          <h1 className="dark">My Projects</h1>
          <div className="gallery-item">
            <div className="text-container" id="gallery">
              <h2>anivanchen.github.io</h2>
              <a className="social-media-button" href="https://github.com/anivanchen/anivanchen.github.io"><i class="bi bi-github"></i></a>
                <p>     
                    This is the website you are currently on right now.
                    During quarantine, I self-taught myself web development
                    and programming. This website a product of my web 
                    development journey.
                </p>
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
                <p>
                    A simple file server with authentication built using
                    the PERN (PostgreSQL, Express, React, Node.js) stack.
                </p>
              <div className="techs-container">
                <a className="tech-link" href="https://www.javascript.org/"><i className="devicon-javascript-plain" /></a>
                <a className="tech-link" href="https://nodejs.org/en/"><i className="devicon-nodejs-plain" /></a>
                <a className="tech-link" href="https://reactjs.org/"><i className="devicon-react-plain" /></a>
                <a className="tech-link" href="https://postgresql.org/"><i className="devicon-postgresql-plain" /></a>
              </div>
            </div>
          </div>
          <div className="gallery-item">
            <div className="text-container" id="gallery">
              <h2>algorithms</h2>
              <a className="social-media-button" href="https://github.com/anivanchen/algorithms"><i class="bi bi-github"></i></a>
                <p>
                    This project contains my implementations of various 
                    algorithms in JavaScript and Python.
                </p>
              <div className="techs-container">
                <a className="tech-link" href="https://www.javascript.org/"><i className="devicon-javascript-plain" /></a>
                <a className="tech-link" href="https://www.python.com/"><i className="devicon-python-plain" /></a>
              </div>
            </div>
          </div>
          <p className="dark">To view the rest of my projects, go to my Github profile. </p>
          <a className="social-media-button dark" href="https://github.com/anivanchen"><i class="bi bi-github"></i></a>
        </div>
      </Fragment>
    )
}

export default Projects;