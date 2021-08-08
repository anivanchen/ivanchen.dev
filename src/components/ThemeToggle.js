import React, { Fragment } from 'react';

function ThemeToggle() {

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
      <Fragment>
        <button className="right mode" onClick={toggleTheme}><i className="bi bi-brightness-high-fill dark"></i></button>
      </Fragment>
    )
}

export default ThemeToggle;