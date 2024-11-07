import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);
const LOCAL_STORAGE_KEY = 'videoplayer-current-time';

// Save the current playback time to local storage every 1 second
player.on(
  'timeupdate',
  throttle(event => {
    localStorage.setItem(LOCAL_STORAGE_KEY, event.seconds);
  }, 1000)
);

// Get saved playback time from local storage and resume from that point
const savedTime = localStorage.getItem(LOCAL_STORAGE_KEY);
if (savedTime) {
  player.setCurrentTime(parseFloat(savedTime)).catch(error => {
    // Handle errors (e.g., if saved time is out of range)
    if (error.name === 'RangeError') {
      console.warn('Saved time is out of range.');
    } else {
      console.error('An error occurred while setting the current time:', error);
    }
  });
}
