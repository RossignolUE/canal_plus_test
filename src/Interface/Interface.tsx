import React from 'react';
import RxPlayer from 'rx-player';
import PlayPauseButton from './PlayPauseButton/PlayPauseButton';
import { utilsPlayer } from '../utils/controlPlayer';
import { Button, Progress } from 'reactstrap';

import './Interface.css';

export type IInterface = {
  player: RxPlayer;
  fullScreen: () => void;
  refVideoPlayer: any;
};

const Interface = (props: IInterface) => {
  const [visibleInterface, setVisibleInterface] = React.useState(false);
  const [durationVideo, setDurationVideo] = React.useState({
    timeStamp: 0,
    minutes: 0,
    seconds: 0,
  });

  let i = setInterval(function () {
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
  }, 200);

  return (
    <>
      <div
        onMouseEnter={() => {
          setVisibleInterface(true);
          console.log('Status player : ', props.player.getPlayerState());
        }}
        onMouseLeave={() => setVisibleInterface(false)}
        onClick={() => props.player.play()}
        className={`interface ${visibleInterface ? 'display' : 'hide'}`}
      >
        {visibleInterface && (
          <>
            <div>
              <span>
                {durationVideo.minutes < 10
                  ? '0' + durationVideo.minutes
                  : durationVideo.minutes}{' '}
                :{' '}
                {durationVideo.seconds < 10
                  ? '0' + durationVideo.seconds
                  : durationVideo.seconds}
              </span>
              <Progress
                className="progress-bar-time"
                value={
                  props.player.getMaximumPosition()
                    ? (durationVideo.timeStamp /
                        props.player.getMaximumPosition()!) *
                      100
                    : 0
                }
              />
            </div>

            <Button
              onClick={() => {
                utilsPlayer.swithPlayOrPause(props.player);
              }}
            >
              <PlayPauseButton player={props.player} />
            </Button>
            <Button
              onClick={() => {
                props.player.pause();
                console.log('test de mise en pause');
              }}
            >
              Pause
            </Button>
            <Button
              onClick={() => {
                if (props.player.getVolume() < 1)
                  props.player.setVolume(props.player.getVolume() + 0.1);
              }}
            >
              Vol+
            </Button>
            <Button
              onClick={() => {
                if (props.player.getVolume() > 0.1)
                  props.player.setVolume(props.player.getVolume() - 0.1);
              }}
            >
              Vol-
            </Button>
            <Button
              onClick={() => {
                props.fullScreen();
              }}
            >
              Screen
            </Button>
            <Button
              onClick={() => {
                props.fullScreen();
              }}
            >
              info
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default Interface;
