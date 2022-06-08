import { Maybe } from 'monet';
import { zip } from 'rxjs';
import { INotification } from './machine';
import { Notifications } from './main';

const start: Date = new Date();

const heading: HTMLHeadingElement = document.createElement('h1');
heading.innerText = 'States history:';
const states: HTMLDivElement = document.createElement('div');
states.style.display = 'flex';
states.style.gap = '1rem';
states.style.overflow = 'scroll';

const availableActions: HTMLDivElement = document.createElement('div');

const notifications: Notifications = Notifications.new({
  config: {
    notificationDuration: 1000,
  },
});
console.dir(notifications);

zip([notifications.state$, notifications.context$]).subscribe(([state, context]) => {
  console.group(`%c${state.value}`, 'color: blue');
  console.log('currentNotification:', context.currentNotification.orNull());
  console.log('pendingNotifications:', context.pendingNotifications);
  console.dir(state);
  console.groupEnd();

  const stateBlockEl = document.createElement('div');

  const stateHeadingEl = document.createElement('h3');
  stateHeadingEl.innerText = `State after ${state.event.type}:`;
  stateBlockEl.appendChild(stateHeadingEl);

  const time = document.createElement('pre');
  time.innerText = `T + ${new Date().getTime() - start.getTime()}ms`;
  stateBlockEl.appendChild(time);

  const stateEl = document.createElement('pre');
  stateEl.innerText = JSON.stringify(state.toStrings(), null, 2);
  stateBlockEl.appendChild(stateEl);

  const contextHeadingEl = document.createElement('h5');
  contextHeadingEl.innerText = `Context:`;
  const contextEl = document.createElement('pre');
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const formatNotification = (notification: INotification) => ({
    id: notification.id,
    message: notification.message,
    duration: notification.duration.orNull(),
    meta: notification.meta.orNull(),
  });
  contextEl.innerText = JSON.stringify(
    {
      currentNotification: context.currentNotification.map(formatNotification).orNull(),
      pendingNotifications: context.pendingNotifications.map(formatNotification),
    },
    null,
    2
  );
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

const notifyTwoSecondsButton: HTMLButtonElement = document.createElement('button');
notifyTwoSecondsButton.innerHTML = 'notify:2s';
notifyTwoSecondsButton.onclick = () =>
  notifications.notify({
    message: 'notification 2s',
    duration: Maybe.Some(2000),
  });
availableActions.appendChild(notifyTwoSecondsButton);

const notifyMetaButton: HTMLButtonElement = document.createElement('button');
notifyMetaButton.innerHTML = 'notify:meta';
notifyMetaButton.onclick = () =>
  notifications.notify({
    message: 'notification meta',
    meta: Maybe.Some({
      foo: 'bar',
    }),
  });
availableActions.appendChild(notifyMetaButton);

const clearButton: HTMLButtonElement = document.createElement('button');
clearButton.innerHTML = 'clear';
clearButton.onclick = () => notifications.clear();
availableActions.appendChild(clearButton);

document.body.appendChild(heading);
document.body.appendChild(availableActions);
document.body.appendChild(states);
