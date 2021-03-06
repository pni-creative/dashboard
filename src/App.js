import React from 'react';
import './App.scss';
import Header from './Components/Header'
import News from './Components/News'
import Video from './Components/Video'
import Poll from './Components/Poll'
import Weather from './Components/Weather'
import Fullscreen from './Components/Fullscreen'

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Video />
      <News />
      <Poll />
      <Weather />
      <Fullscreen />
    </div>
  );
}

export default App;
