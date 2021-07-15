import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import LoadingScreen from './components/LoadingScreen';
import DotRing from "./components/DotRing/DotRing";

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

//   let test = document.getElementsByClassName("cursor-affector");

//   for (let i = 0 ; i < test.length; i++) {
//     test[i].addEventListener("mouseover", function() {
//       document.getElementById('dot').classList.add('cursor-change');
//     }, false);
//  }

  return (
    <>
      {loading === false ? (

        <Fragment>
        <DotRing />
        <div className="opening-wrapper">
          <button className="right mode" onClick={toggleTheme}><i className="cursor-affector bi bi-brightness-high-fill dark"></i></button>
            <div className="opening-container">
  
            <div className="text-container">
              <h3>Hi, I'm <a className="cursor-affector link" href="https://github.com/anivanchen">Ivan Chen</a>, a current sophomore at <a className="link" href="https://stuy.enschool.org/">Stuyvesant High School</a>.</h3>
              <p>At Stuy, I am in the class of 2024. I enjoy computer science and mathematics. I love learning new things and starting new <a className="link" href="#projects">projects</a>, especially those that challenge me and introduce novel topics. Learning never ends, and there's always more for me to explore.</p>
            </div>
  
            <a className="cursor-affector social-media-button dark" href="https://linkedin.com/in/ivan-chen-9b85481b6"><i class="bi bi-linkedin"></i></a>
            <a className="cursor-affector social-media-button dark" href="https://github.com/anivanchen"><i class="bi bi-github"></i></a>
            <a className="cursor-affector social-media-button dark" href="/"><i class="bi bi-file-earmark"></i></a>
          
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