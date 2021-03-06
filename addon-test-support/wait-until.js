import Ember from 'ember';
const { run, RSVP } = Ember;

export function waitUntil(callback, { timeout = 1000 } = {}) {
  return new RSVP.Promise(function(resolve, reject) {
    let value = run(callback);
    if (value) {
      resolve(value);
    }
    let time = 0;
    let tick = function() {
      time += 10;
      let value = run(callback);
      if (value) {
        resolve(value);
      } else if (time < timeout) {
        setTimeout(tick, 10);
      } else {
        reject('waitUntil timed out');
      }
    };
    setTimeout(tick, 10);
  });
}
