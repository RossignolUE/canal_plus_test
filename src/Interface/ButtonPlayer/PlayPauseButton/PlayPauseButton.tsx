import React from 'react';
import RxPlayer from 'rx-player';
import Spinner from 'react-bootstrap/Spinner';

export type IPlayButton = {
  playerState: string;
};

const PlayButton = () => {
  return <>Play</>;
};

const PauseButton = () => {
  return <>Pause</>;
};

const LoadButton = () => {
  return <>Load</>;
};

const ReviewButton = () => {
  return <>Review</>;
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
        return <LoadButton />;
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
