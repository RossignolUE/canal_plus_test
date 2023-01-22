import PlayPauseButton from './PlayPauseButton/PlayPauseButton';
import { PlayPauseButtonServices } from './PlayPauseButton/PlayPauseButton.services';
import { Button } from 'reactstrap';
import RxPlayer from 'rx-player';

export interface IButtonPlayer {
  player: RxPlayer;
  statePlayer: string;
  fullScreen: () => void;
  openInformationInterface: () => void;
}

export const ButtonPlayer = (props: IButtonPlayer) => {
  return (
    <>
      <Button
        onClick={() => {
          PlayPauseButtonServices.swithPlayOrPause(props.player);
        }}
      >
        <PlayPauseButton playerState={props.statePlayer} />
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
      <Button onClick={() => props.openInformationInterface()}>info</Button>
    </>
  );
};
