import React from 'react';
import RxPlayer from 'rx-player';
import Interface from './Interface/Interface';
import './App.css';

const App = () => {
  let player: RxPlayer | undefined = new RxPlayer();

  window.onbeforeunload = function () {
    player?.stop();
    player?.dispose();
    document.querySelector('video')!.remove();
    player = undefined;
  };

  React.useEffect(() => {
    player!.videoElement = document.querySelector('video')!;
    player!.loadVideo({
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      transport: 'directfile',
    });
  }, []);

  return (
    <div className="App">
      <video />
      {player && (
        <Interface
          fullScreen={() => {
            if (document.fullscreenElement !== null) {
              document.exitFullscreen();
            } else {
              document.querySelector('body')!.requestFullscreen();
            }
          }}
          player={player}
        />
      )}
    </div>
  );
};

export default App;
