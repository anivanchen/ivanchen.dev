import React, { Fragment } from 'react';
import ThemeToggle from './ThemeToggle';

function OpeningScreen() {
    return (
      <Fragment>
        <div className="opening-wrapper">
          <ThemeToggle />
          <div className="opening-container">  
            <div className="text-container">
              <h3>Hi, I'm <a className="link" href="https://github.com/anivanchen">Ivan Chen</a>, a current sophomore at <a className="link" href="https://stuy.enschool.org/">Stuyvesant High School</a>.</h3>
              <p>At Stuy, I am in the class of 2024. I enjoy computer science and mathematics. I love learning new things and starting new <a className="link" href="#gallery">projects</a>, especially those that challenge me and introduce novel topics. Learning never ends, and there's always more for me to explore.</p>
            </div>
            <a className="social-media-button dark" href="https://linkedin.com/in/ivan-chen-9b85481b6"><i class="bi bi-linkedin"></i></a>
            <a className="social-media-button dark" href="https://github.com/anivanchen"><i class="bi bi-github"></i></a>
            <a className="social-media-button dark" href="https://stackoverflow.com/users/14101065/ivan-chen"><i class="bi bi-stack"></i></a>
            {/* <a className="social-media-button dark" href="/"><i class="bi bi-file-earmark"></i></a> */}
          </div>
        </div>
      </Fragment>
    )
}

export default OpeningScreen;