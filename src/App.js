import React from 'react';
import './App.scss';
import Header from './Components/Header'
import News from './Components/News'
import Video from './Components/Video'
import Poll from './Components/Poll'
import Weather from './Components/Weather'
import Traffic from './Components/Traffic'

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Video />
      <News />
      <Poll />
      <Weather />
      <Traffic />
    </div>
  );
}

export default App;
