import React, { Fragment } from 'react';

function Footer() {
    return (
      <Fragment>
        <div className="footer">
          <a className="social-media-button" href="https://linkedin.com/in/ivan-chen-9b85481b6"><i class="bi bi-linkedin"></i></a>
          <a className="social-media-button" href="https://github.com/anivanchen"><i class="bi bi-github"></i></a>
          <a className="social-media-button" href="https://stackoverflow.com/users/14101065/ivan-chen"><i class="bi bi-stack"></i></a>
          {/* <a className="social-media-button" href="/"><i class="bi bi-file-earmark"></i></a> */}
          <p><a href="https://github.com/anivanchen/anivanchen.github.io/issues">Report Bugs & Issues</a></p>
          <p>Copyright © 2021 Ivan Chen</p>
        </div>
      </Fragment>
        
    )
}

export default Footer;