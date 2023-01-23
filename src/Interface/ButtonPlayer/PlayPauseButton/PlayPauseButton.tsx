import Spinner from 'react-bootstrap/Spinner';
import {
  BsFillPlayFill,
  BsFillPauseFill,
  BsArrowClockwise,
} from 'react-icons/bs';

export type IPlayButton = {
  playerState: string;
};
const PlayButton = () => {
  return <BsFillPlayFill />;
};

const PauseButton = () => {
  return <BsFillPauseFill />;
};

const ReviewButton = () => {
  return <BsArrowClockwise />;
};

const LoadingLogo = () => {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

const ErrorLogo = () => {
  return <span>Error !</span>;
};

const PlayPauseButton = (props: IPlayButton) => {
  const getButtonOrLogo = (playerState: string): JSX.Element => {
    switch (playerState) {
      case 'STOPPED':
        return <PlayButton />;
      case 'LOADING':
        return <LoadingLogo />;
      case 'LOADED':
        return <PlayButton />;
      case 'PLAYING':
        return <PauseButton />;
      case 'PAUSED':
        return <PlayButton />;
      case 'BUFFERING':
        return <LoadingLogo />;
      case 'SEEKING':
        return <LoadingLogo />;
      case 'ENDED':
        return <ReviewButton />;
      case 'RELOADING':
        return <LoadingLogo />;
      default:
        return <ErrorLogo />;
    }
  };

  return getButtonOrLogo(props.playerState);
};

export default PlayPauseButton;
