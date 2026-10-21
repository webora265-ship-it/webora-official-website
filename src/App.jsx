import React from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import Featured from './components/Featured';
import Services from './components/Services';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <HeroBanner />
      <Featured />
      <Services />
      <Footer />
    </div>
  );
}

export default App;
