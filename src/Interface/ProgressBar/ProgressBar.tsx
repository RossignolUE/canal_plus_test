import RxPlayer from 'rx-player';
import React from 'react';
import { Input } from 'reactstrap';
import './ProgressBar.css';

export interface IDurationVideo {
  timeStamp: number;
  minutes: number;
  seconds: number;
}

export interface IProgressBar {
  durationVideo: IDurationVideo;
  player: RxPlayer;
}

export const ProgressBar = (props: IProgressBar) => {
  const [rangeInput, setRangeInput] = React.useState(0);
  const [userSetRangeInput, setUserSetRangeInput] = React.useState(false);

  React.useEffect(() => {}, [props.durationVideo]);

  return (
    <>
      <Input
        id="exampleRange"
        name="range"
        type="range"
        onChange={(value) => setRangeInput(parseInt(value.target.value))}
        onMouseDown={() => setUserSetRangeInput(true)}
        onMouseUp={() => {
          setUserSetRangeInput(false);
          props.player.seekTo(
            (rangeInput / 100) * props.player.getMaximumPosition()!
          );
        }}
        value={
          userSetRangeInput
            ? rangeInput
            : props.durationVideo.timeStamp ===
              props.player.getMaximumPosition()
            ? 100
            : props.player.getMaximumPosition()
            ? (props.durationVideo.timeStamp /
                props.player.getMaximumPosition()!) *
              100
            : 0
        }
      />
      <span className="time_player">
        {props.durationVideo.minutes < 10
          ? '0' + props.durationVideo.minutes
          : props.durationVideo.minutes}{' '}
        :{' '}
        {props.durationVideo.seconds < 10
          ? '0' + props.durationVideo.seconds
          : props.durationVideo.seconds}
      </span>
    </>
  );
};
