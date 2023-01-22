import React from 'react';
import RxPlayer from 'rx-player';
import './App.css';
import Interface from './Interface/Interface';

const App = () => {
  const [interfaceVideo, setInterfaceVideo] = React.useState<
    JSX.Element | undefined
  >(undefined);
  let player: RxPlayer | undefined = new RxPlayer();

  const getInterface = (player: RxPlayer) => {
    return (
      <Interface
        fullScreen={() => {
          if (document.fullscreenElement !== null) {
            document.exitFullscreen();
          } else {
            document.querySelector('.App')!.requestFullscreen();
          }
        }}
        player={player}
      />
    );
  };

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
    setInterfaceVideo(getInterface(player!));
  }, []);

  return (
    <div className="App">
      <video />
      {interfaceVideo ? interfaceVideo : <></>}
    </div>
  );
};

export default App;
