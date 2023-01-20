import React from 'react';
import RxPlayer from 'rx-player';
import './App.css';

function App() {
  // instantiate it
  const player = new RxPlayer({
    videoElement: document.querySelector('video')!,
  });

  // play a video
  player.loadVideo({
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    transport: 'dash',
  });

  return (
    <div className="App">
      <video />
    </div>
  );
}

export default App;
