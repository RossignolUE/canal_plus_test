import { IDurationVideo } from '../ProgressBar/ProgressBar';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import React from 'react';

export interface ISlideInformation {
  duration: IDurationVideo;
  stateSlide: boolean;
}

interface RequestInformationScene {
  status: 'Sucess' | 'Error' | 'Pending' | 'Empty';
  data: any;
}

export const SlideInformation = (props: ISlideInformation) => {
  const baseUrl = 'https://teamplayer.ddns.net:32783';
  const [informationScene, setInformationScene] =
    React.useState<RequestInformationScene>({
      status: 'Empty',
      data: undefined,
    });
  const [currentSceneDuration, setCurrentSceneDuration] = React.useState('');

  React.useEffect(() => {
    if (props.stateSlide) {
      let durationSnapShot = props.duration;
      setCurrentSceneDuration(`${
        props.duration.minutes < 10
          ? '0' + props.duration.minutes
          : props.duration.minutes
      }:
        ${
          props.duration.seconds < 10
            ? '0' + props.duration.seconds
            : props.duration.seconds
        }`);
      setInformationScene({
        status: 'Pending',
        data: undefined,
      });
      axios
        .get(`${baseUrl}/scene/${durationSnapShot.timeStamp}`)
        .then(function (response: any) {
          setInformationScene({
            status: 'Sucess',
            data: response.data,
          });
        })
        .catch(function (error: any) {
          setInformationScene({
            status: 'Error',
            data: error,
          });
        });
    }
  }, [props.stateSlide]);

  const getContentInformation = (
    request: RequestInformationScene
  ): JSX.Element => {
    switch (request.status) {
      case 'Sucess':
        return (
          <div>
            <p>Scene at {currentSceneDuration}</p>
            {request.data.casting.length > 0 && (
              <>
                <p>Casting :</p>
                <ul>
                  {request.data.casting.map(
                    (
                      actor: {
                        id: number;
                        description: string;
                        image: string;
                        name: string;
                      },
                      index: number
                    ) => {
                      return (
                        <li key={`${actor.id}_${index}`}>
                          name: {actor.name}
                          <br />
                          <img
                            src={`${baseUrl}${actor.image.replace('.', '')}`}
                            alt=""
                            width={'20%'}
                          />
                          {actor.description}
                        </li>
                      );
                    }
                  )}
                </ul>
              </>
            )}
          </div>
        );
      case 'Pending':
        return (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        );
      case 'Error':
        return <>Erreur : {request.data.toString()}</>;
      case 'Empty':
        return (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        );
      default:
        return <></>;
    }
  };

  return <>{getContentInformation(informationScene)}</>;
};
