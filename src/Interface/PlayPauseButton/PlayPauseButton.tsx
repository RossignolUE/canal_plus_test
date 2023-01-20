import React from 'react';
import RxPlayer from 'rx-player';
import Spinner from 'react-bootstrap/Spinner';

export type IPlayButton = {
  player: RxPlayer;
};

const PlayButton = () => {
  return <>Play</>;
};

const PauseButton = () => {
  return <>Pause</>;
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
  const getButtonOrLogo = (player: RxPlayer): JSX.Element => {
    switch (player.getPlayerState()) {
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
        return <PlayButton />;
      case 'RELOADING':
        return <LoadingLogo />;
      default:
        return <ErrorLogo />;
    }
  };

  return getButtonOrLogo(props.player);
};

export default PlayPauseButton;
