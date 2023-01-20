import React from 'react';
import RxPlayer from 'rx-player';
import './App.css';
import Interface from './Interface/Interface';

const App = () => {
  let player: RxPlayer | undefined = undefined;

  player = new RxPlayer({
    videoElement: document.querySelector('video')!,
  });
  player.loadVideo({
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    transport: 'directfile',
  });

  const videoRef = React.useRef();

  React.useEffect(
    () => () => {
      if (player !== undefined) {
        player.removeEventListener('error');
        player.stop();
      }
    },
    []
  );

  return (
    <>
      <video ref={videoRef as any} />
      {player && (
        <Interface
          player={player}
          fullScreen={() => {
            document.querySelector('video')!.requestFullscreen();
          }}
          refVideoPlayer={videoRef}
        />
      )}
    </>
  );
};

export default App;
