/* eslint-disable @rushstack/typedef-var */
import { combineLatest } from 'rxjs';
import { combineMeta, Flowtime, getTimeRecommendation } from './main';

const heading = document.createElement('h1');
heading.innerText = 'States history:';
const states = document.createElement('div');
states.style.display = 'flex';
states.style.gap = '1rem';
states.style.overflow = 'scroll';

const availableActions = document.createElement('div');

const flowtime = Flowtime.new({
  config: {
    proposalDelays: {
      break: 20000,
      stop: 10000,
    },
  },
  services: {
    propose: (t) => console.log(t),
  },
});

flowtime.state$.subscribe((state) => {
  console.log(state);

  const stateBlockEl = document.createElement('div');

  const stateHeadingEl = document.createElement('h3');
  stateHeadingEl.innerText = `State after ${state.event.type}:`;
  const stateEl = document.createElement('pre');
  stateEl.innerText = JSON.stringify(state.toStrings(), null, 2);
  stateBlockEl.appendChild(stateHeadingEl);
  stateBlockEl.appendChild(stateEl);

  const timeRecommendationEl = document.createElement('pre');
  timeRecommendationEl.innerText = getTimeRecommendation(
    state.context.config,
    combineMeta(state.meta).recommendationType,
    combineMeta(state.meta).recommendationModifier
  )
    .map(String)
    .orSome('no recommendation');
  stateBlockEl.appendChild(timeRecommendationEl);

  const metaHeadingEl = document.createElement('h5');
  metaHeadingEl.innerText = `Meta:`;
  const metaEl = document.createElement('pre');
  metaEl.innerText = JSON.stringify(combineMeta(state.meta), null, 2);
  stateBlockEl.appendChild(metaHeadingEl);
  stateBlockEl.appendChild(metaEl);

  const contextHeadingEl = document.createElement('h5');
  contextHeadingEl.innerText = `Context:`;
  const contextEl = document.createElement('pre');
  contextEl.innerText = JSON.stringify(state.context, null, 2);
  stateBlockEl.appendChild(contextHeadingEl);
  stateBlockEl.appendChild(contextEl);

  states.appendChild(stateBlockEl);
});

flowtime.availableActions$.subscribe((actions) => {
  availableActions.innerHTML = '';
  actions.forEach((action) => {
    const button = document.createElement('button');
    button.innerHTML = action;
    button.onclick = () => flowtime.dispatch(action);
    availableActions.appendChild(button);
  });
});

document.body.appendChild(heading);
document.body.appendChild(availableActions);
document.body.appendChild(states);
