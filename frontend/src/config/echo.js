import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

export const echo = new Echo({
    broadcaster: 'pusher',
    key: '38a7faf7510acaec457c',
    cluster: 'ap2',
    authEndpoint: 'http://localhost:8000/broadcasting/auth',
    forceTLS: true,
    auth: {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
  },
});

export default echo;