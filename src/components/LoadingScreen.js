import React, { Fragment } from 'react';
import logo from '../images/Personal Logo (Simple) (Dark).png';

function LoadingScreen() {
    return (
      <Fragment>
        <div className="wrapper" id="loader">
          <div className="ball">
            <img src={logo} height="100px" width="100px" alt="Ivan Chen"/>
          </div>
        </div>
      </Fragment>
    )
}

export default LoadingScreen;