import Head from 'next/head'
import Image from 'next/image'
import React from 'react';
import styles from '../styles/Home.module.css'

export default function Home() {

  React.useEffect(() => {
    
    // Sticky Navbar
    const navbar = document.getElementById("navbar");
    var sticky = navbar.offsetTop;
    window.onscroll = function() {myFunction()};
    function myFunction() {
      if (window.pageYOffset >= sticky) {
        navbar.style.position = 'fixed'
      } else {
        navbar.style.position = 'relative';
      }
    }

  });

  return (
    <div className={styles.container}>

      <div className={styles.opening}>
        <div className={styles.centered}>
          <h2>Hey, I'm</h2>
          <h1 className={styles.white}>Ivan Chen</h1>
          <p>I'm a sophmore at <a className={styles.link}> Stuyvesant High School</a> {' '}
            who enjoys doing <a href="#highlightProjects" className={styles.link}>programming projects</a>
            {' '}in my spare time. I am interested in anything
            related to technology ranging from artificial
            intelligence to IT infrastructure to cyber security.
            I am a passionate software engineer and web developer,
            as well as a music lover.
          </p>
          <a href="#about"><button>About</button></a>
          <a href="#projects"><button>Projects</button></a>
          <a href="#contact"><button>Contact</button></a>
          <p className={styles.downArrow}>↓</p>
        </div>
      </div>

      <div className={styles.navbar} id="navbar">
        <Image src="/favicon.ico" width="10" height="10" />
        <ul className={styles.centered}>
          <li><p><a href="#about" className={styles.link}>About</a></p></li>
          <li><p><a href="/crypto" className={styles.link}>Projects</a></p></li>
          <li><p><a href="#contact" className={styles.link}>Contact</a></p></li>
          <li><p><a href="/blog" className={styles.link}>Blog</a></p></li>
          <li><p><a href="/resume.pdf" className={styles.link}>Resume</a></p></li>
        </ul>
        <div>
          <a href="https://linkedin.com/in/anivanchen" className={styles.icon + " " + styles.link}>
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
              </svg>
          </a>
          <a href="https://github.com/anivanchen" className={styles.icon + " " + styles.link}>
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
              </svg>
          </a>
        </div>
        
      </div>

      <a id="about"></a>
      <div className={styles.about}>
        <div className={styles.centered}>
          <img />
          <h2 className={styles.red}>Who Am I?</h2>

          <p>I am a student at {' '}
            <a href="https://stuy.enschool.org" className={styles.red + " " + styles.link}>Stuyvesant High School</a>
            {' '} and am involved in <a href="https://stuypulse.com" className={styles.red + " " + styles.link}>StuyPulse</a>,
            Stuyvesant's FIRST robotics team, where I work on creating
            material to teach future members and work with
            others to write code for our robot. I also work
            on other side projects in my free time such as
            web development and Python command line scripts,
            some of which are publically shown on my {' '}
            <a href="https://github.com/anivanchen" className={styles.red + " " + styles.link}>GitHub profile</a>.
          </p>

          <p>My favorite programming languages are JavaScript,
            Python, and Next. I use Docker and Heroku for deployment,
            React for front-end, Express for middle-ware, Node for
            back-end, and PostgreSQL and MongoDB for database management.
          </p>
        </div>
      </div>

      {/* <a id="projects"></a>
      <div className={styles.highlightProjects}>
        <div className={styles.highlightProject}>
          <img />
          <h2>Title</h2>
          <p>Description</p>
          <p>View Project Source →</p>
          <p>View Project →</p>
        </div>
        <div className={styles.highlightProject}>
          <img />
          <h2>Title</h2>
          <p>Description</p>
          <p>View Project Source →</p>
          <p>View Project →</p>
        </div>
        <div className={styles.highlightProject}>
          <img />
          <h2>Title</h2>
          <p>Description</p>
          <p>View Project Source →</p>
          <p>View Project →</p>
        </div>
      </div>

      <div className={styles.otherProjects}>
        <div className={styles.smallProject}>
          <p>Title →</p>
          <p>Description</p>
        </div>
        <div className={styles.smallProject}>
          <p>Title →</p>
          <p>Description</p>
        </div>
        <div className={styles.smallProject}>
          <p>Title →</p>
          <p>Description</p>
        </div>
        <div className={styles.smallProject}>
          <p>Title →</p>
          <p>Description</p>
        </div>
        <div className={styles.smallProject}>
          <p>Title →</p>
          <p>Description</p>
        </div>
        <div className={styles.smallProject}>
          <p>Title →</p>
          <p>Description</p>
        </div>
        <div className={styles.smallProject}>
          <p>Title →</p>
          <p>Description</p>
        </div>
        <div className={styles.smallProject}>
          <p>Title →</p>
          <p>Description</p>
        </div>
      </div> */}

      <a id="contact"></a>
      <div className={styles.contact}>
        <div className={styles.centered}>
          <h2 className={styles.red}>Get in touch</h2>
          <p>Feel free to reach out! I would love to talk with anyone about
            anything. I usually reply within about a couple hours to a
            day during all hours (I'm a night owl) depending on my schedule.
            You can reach me at {' '}
            <a href="mailto:ivanchen07@gmail.com" className={styles.red + " " + styles.link}>ivanchen07@gmail.com</a>,
            or on Discord either at {' '}
            <a href="https://discordapp.com/channels/@me/822130958148435980/" className={styles.red + " " + styles.link}>TinyPixl#8196</a>
            {' '}or at this <a href="https://discord.gg/YWtm6Q7JQP" className={styles.red + " " + styles.link}>server</a>.
          </p>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.centered}>
          <a href="https://linkedin.com/in/anivanchen" className={styles.link}>
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
            </svg>
          </a>
          <a href="https://github.com/anivanchen" className={styles.link}>
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
          </a>
        </div>
        <div className={styles.verticalCentered}>
          <p><a href="https://github.com/anivanchen/anivanchen.github.io/issues" className={styles.link}>Report a Bug</a></p>
          <p>Copyright © 2021 Ivan Chen</p>
        </div>
      </footer>
    </div>
  )
}
