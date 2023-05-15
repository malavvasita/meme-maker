import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import Memes from './pages/index';
import Create from './pages/createMeme';
import Footer from './components/Footer';

import './App.css';

function App() {
  return (
    <>
      <Router>
        <div className="meme-maker">
          <Header />
          <Routes>
            <Route path="/" element={<Memes />} />
            <Route path="/create" element={<Create />} />
            <Route
              path="*"
              element={
                <div>
                  <h2>404 Page not found etc</h2>
                </div>
              }
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
