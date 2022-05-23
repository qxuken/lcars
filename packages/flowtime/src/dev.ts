import { zip } from 'rxjs';
import { Flowtime } from './main';

const heading: HTMLHeadingElement = document.createElement('h1');
heading.innerText = 'States history:';
const states: HTMLDivElement = document.createElement('div');
states.style.display = 'flex';
states.style.gap = '1rem';
states.style.overflow = 'scroll';

const availableActions: HTMLDivElement = document.createElement('div');

const flowtime: Flowtime = Flowtime.new({
  config: {
    minimumActivityDurationMinutes: 1,
  },
  services: {
    propose: (t) => console.log(t),
  },
});
console.log(flowtime);

zip([flowtime.state$, flowtime.timeRecommendation$, flowtime.meta$, flowtime.context$]).subscribe(
  ([state, timeRecommendation, meta, context]) => {
    console.log([state, timeRecommendation, meta, context]);

    const stateBlockEl = document.createElement('div');

    const stateHeadingEl = document.createElement('h3');
    stateHeadingEl.innerText = `State after ${state.event.type}:`;
    const stateEl = document.createElement('pre');
    stateEl.innerText = JSON.stringify(state.toStrings(), null, 2);
    stateBlockEl.appendChild(stateHeadingEl);
    stateBlockEl.appendChild(stateEl);

    const timeRecommendationEl = document.createElement('pre');
    timeRecommendationEl.innerText = timeRecommendation.map(String).orSome('no recommendation');
    stateBlockEl.appendChild(timeRecommendationEl);

    const metaHeadingEl = document.createElement('h5');
    metaHeadingEl.innerText = `Meta:`;
    const metaEl = document.createElement('pre');
    metaEl.innerText = JSON.stringify(meta, null, 2);
    stateBlockEl.appendChild(metaHeadingEl);
    stateBlockEl.appendChild(metaEl);

    const contextHeadingEl = document.createElement('h5');
    contextHeadingEl.innerText = `Context:`;
    const contextEl = document.createElement('pre');
    contextEl.innerText = JSON.stringify(context, null, 2);
    stateBlockEl.appendChild(contextHeadingEl);
    stateBlockEl.appendChild(contextEl);

    states.prepend(stateBlockEl);
  }
);

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
