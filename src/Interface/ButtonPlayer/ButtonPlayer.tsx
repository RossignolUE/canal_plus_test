import RxPlayer from 'rx-player';
import PlayPauseButton from './PlayPauseButton/PlayPauseButton';
import { PlayPauseButtonServices } from './PlayPauseButton/PlayPauseButton.services';
import { Button, Container, Row, Col } from 'reactstrap';
import { RxSpeakerLoud, RxSpeakerModerate } from 'react-icons/rx';
import { BsFillInfoCircleFill, BsArrowsFullscreen } from 'react-icons/bs';
import './ButtonPlayer.css';

export interface IButtonPlayer {
  player: RxPlayer;
  statePlayer: string;
  fullScreen: () => void;
  openInformationInterface: () => void;
}

export const ButtonPlayer = (props: IButtonPlayer) => {
  return (
    <Container className="button_player_content">
      <Row>
        <Col>
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
            <RxSpeakerLoud />
          </Button>
          <Button
            onClick={() => {
              if (props.player.getVolume() > 0.1)
                props.player.setVolume(props.player.getVolume() - 0.1);
            }}
          >
            <RxSpeakerModerate />
          </Button>
        </Col>
        <Col></Col>
        <Col>
          <Button onClick={() => props.openInformationInterface()}>
            <BsFillInfoCircleFill />
          </Button>
          <Button
            onClick={() => {
              props.fullScreen();
            }}
          >
            <BsArrowsFullscreen />
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
