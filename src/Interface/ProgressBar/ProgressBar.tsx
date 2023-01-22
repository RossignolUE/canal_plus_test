import RxPlayer from 'rx-player';
import { Progress } from 'reactstrap';
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
  return (
    <div>
      <span>
        {props.durationVideo.minutes < 10
          ? '0' + props.durationVideo.minutes
          : props.durationVideo.minutes}{' '}
        :{' '}
        {props.durationVideo.seconds < 10
          ? '0' + props.durationVideo.seconds
          : props.durationVideo.seconds}
      </span>
      <Progress
        className="progress-bar-time"
        value={
          props.player.getMaximumPosition()
            ? (props.durationVideo.timeStamp /
                props.player.getMaximumPosition()!) *
              100
            : 0
        }
      />
    </div>
  );
};
