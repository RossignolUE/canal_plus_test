import RxPlayer from 'rx-player';

export const utilsPlayer = {
  swithPlayOrPause: (player: RxPlayer) => {
    switch (player.getPlayerState()) {
      case 'LOADED':
        player.play();
        break;
      case 'STOPPED':
        player.loadVideo({
          url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          transport: 'directfile',
        });
        break;
      case 'PLAYING':
        player.pause();
        break;
      case 'PAUSED':
        player.play();
        break;
      default:
        break;
    }
  },
};
