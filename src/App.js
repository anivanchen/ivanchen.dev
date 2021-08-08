import React, { Fragment, useState, useEffect } from 'react';
import './App.css';

import DotRing from './components/DotRing';
import LoadingScreen from './components/LoadingScreen';
import OpeningScreen from './components/OpeningScreen';
import Projects from './components/Projects';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
      setTimeout(() => setLoading(false), 1550)
  }, [])

  return (
    <>
      {loading === false ? (
        <Fragment>
          <DotRing />
          <OpeningScreen />
          <Projects />
          <ContactForm />
          <Footer />
        </Fragment>

      ) : (
          <LoadingScreen />
      )
      }
    </>
  )
}

export default App;