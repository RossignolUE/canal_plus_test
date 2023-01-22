import React from 'react';
import RxPlayer from 'rx-player';
import { ButtonPlayer } from './ButtonPlayer/ButtonPlayer';

import './Interface.css';
import { ProgressBar } from './ProgressBar/ProgressBar';

export type IInterface = {
  player: RxPlayer;
  fullScreen: () => void;
};

const Interface = (props: IInterface) => {
  const [visibleInterface, setVisibleInterface] = React.useState(false);
  const [statePlayer, setStatePlayer] = React.useState<string>(
    props.player.getPlayerState()
  );
  const [durationVideo, setDurationVideo] = React.useState({
    timeStamp: 0,
    minutes: 0,
    seconds: 0,
  });

  let i = setInterval(function () {
    let previousState = statePlayer;
    let currentState = props.player.getPlayerState();
    setStatePlayer(currentState);
    if (previousState === 'LOADING' && currentState === 'LOADED') {
      props.player.play();
    }
    if (props.player.getPosition() > 0) {
      let minutes = parseInt(`${props.player.getPosition() / 60}`, 10);
      let seconds = Math.trunc(props.player.getPosition() % 60);
      setDurationVideo({
        timeStamp: props.player.getPosition(),
        minutes: minutes,
        seconds: seconds,
      });
      clearInterval(i);
    }
  }, 1000);

  return (
    <>
      <div
        onMouseEnter={() => {
          setVisibleInterface(true);
          console.log('Status player : ', props.player.getPlayerState());
        }}
        onMouseLeave={() => setVisibleInterface(false)}
        className={`interface ${visibleInterface ? 'display' : 'hide'}`}
      >
        {visibleInterface && (
          <>
            <ProgressBar durationVideo={durationVideo} player={props.player} />
            <ButtonPlayer
              fullScreen={props.fullScreen}
              player={props.player}
              statePlayer={statePlayer}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Interface;
