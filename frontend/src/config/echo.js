import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: "pusher",
  key: "38a7faf7510acaec457c", //put in .env
  cluster: "ap2", // e.g., "mt1"
  forceTLS: true,
});

export default echo;
