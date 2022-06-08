import { zip } from 'rxjs';
import { Notifications } from './main';

const heading: HTMLHeadingElement = document.createElement('h1');
heading.innerText = 'States history:';
const states: HTMLDivElement = document.createElement('div');
states.style.display = 'flex';
states.style.gap = '1rem';
states.style.overflow = 'scroll';

const availableActions: HTMLDivElement = document.createElement('div');

const notifications: Notifications = Notifications.new({
  config: {
    notificationDelay: 1000,
  },
});
console.log(notifications);

zip([notifications.state$, notifications.context$]).subscribe(([state, context]) => {
  console.log([state, context]);

  const stateBlockEl = document.createElement('div');

  const stateHeadingEl = document.createElement('h3');
  stateHeadingEl.innerText = `State after ${state.event.type}:`;
  const stateEl = document.createElement('pre');
  stateEl.innerText = JSON.stringify(state.toStrings(), null, 2);
  stateBlockEl.appendChild(stateHeadingEl);
  stateBlockEl.appendChild(stateEl);

  const contextHeadingEl = document.createElement('h5');
  contextHeadingEl.innerText = `Context:`;
  const contextEl = document.createElement('pre');
  contextEl.innerText = JSON.stringify(context, null, 2);
  stateBlockEl.appendChild(contextHeadingEl);
  stateBlockEl.appendChild(contextEl);

  states.prepend(stateBlockEl);
});

const notificationButton: HTMLButtonElement = document.createElement('button');
notificationButton.innerHTML = 'notify';
notificationButton.onclick = () =>
  notifications.notify({
    message: 'notification',
  });
availableActions.appendChild(notificationButton);

const notifyImmediateButton: HTMLButtonElement = document.createElement('button');
notifyImmediateButton.innerHTML = 'notifyImmediate';
notifyImmediateButton.onclick = () =>
  notifications.notifyImmediate({
    message: 'immediate notification',
  });
availableActions.appendChild(notifyImmediateButton);

const notifyImmediateSkipButton: HTMLButtonElement = document.createElement('button');
notifyImmediateSkipButton.innerHTML = 'notifyImmediate:skip';
notifyImmediateSkipButton.onclick = () =>
  notifications.notifyImmediate(
    {
      message: 'immediate notification',
    },
    true
  );
availableActions.appendChild(notifyImmediateSkipButton);

const clearButton: HTMLButtonElement = document.createElement('button');
clearButton.innerHTML = 'clear';
clearButton.onclick = () => notifications.clear();
availableActions.appendChild(clearButton);

document.body.appendChild(heading);
document.body.appendChild(availableActions);
document.body.appendChild(states);
