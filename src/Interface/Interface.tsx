import React from 'react';
import RxPlayer from 'rx-player';
import SlidingPane from 'react-sliding-pane';
import { ButtonPlayer } from './ButtonPlayer/ButtonPlayer';
import { ProgressBar } from './ProgressBar/ProgressBar';
import { SlideInformation } from './SlideInformation/SlideInformation';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import './Interface.css';

export type IInterface = {
  player: RxPlayer;
  fullScreen: () => void;
};

const Interface = (props: IInterface) => {
  const [informationsInterface, setInformationsInterface] =
    React.useState(false);
  const [statePlayer, setStatePlayer] = React.useState<string>(
    props.player.getPlayerState()
  );
  const [durationVideo, setDurationVideo] = React.useState({
    timeStamp: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mouseMoving, setMouseMoving] = React.useState(true);

  let i = setInterval(function () {
    let currentState = props.player.getPlayerState();
    setStatePlayer(currentState);
    if (currentState === 'LOADED') {
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

  const setTimeoutMouveMouse = () => {
    let mouseMovingTimeout;
    setMouseMoving(true);
    document.documentElement.style.cursor = 'auto';
    clearTimeout(mouseMovingTimeout);
    mouseMovingTimeout = setTimeout(function () {
      setMouseMoving(false);
      document.documentElement.style.cursor = 'none';
    }, 8000);
  };

  return (
    <div
      className="parent_interface"
      onMouseMove={() => {
        setTimeoutMouveMouse();
      }}
      onMouseEnter={() => {
        setTimeoutMouveMouse();
      }}
      onClick={() => {
        setTimeoutMouveMouse();
      }}
    >
      <div
        className={`interface ${
          mouseMoving || informationsInterface ? 'display' : 'hide'
        }`}
        onMouseMove={() => {
          setTimeoutMouveMouse();
        }}
        onMouseEnter={() => {
          setTimeoutMouveMouse();
        }}
        onClick={() => {
          setTimeoutMouveMouse();
        }}
      >
        {(mouseMoving || informationsInterface) && (
          <>
            <div className="interface_player">
              <div className="button_player">
                <ButtonPlayer
                  fullScreen={props.fullScreen}
                  player={props.player}
                  statePlayer={statePlayer}
                  openInformationInterface={() =>
                    setInformationsInterface(true)
                  }
                />
              </div>
              <div className="progress_bar">
                <ProgressBar
                  durationVideo={durationVideo}
                  player={props.player}
                />
              </div>
            </div>
            <SlidingPane
              isOpen={informationsInterface}
              from="right"
              width="30%"
              onRequestClose={() => setInformationsInterface(false)}
            >
              <SlideInformation
                duration={durationVideo}
                stateSlide={informationsInterface}
              />
            </SlidingPane>
          </>
        )}
      </div>
    </div>
  );
};

export default Interface;
