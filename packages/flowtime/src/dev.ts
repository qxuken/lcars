import { interpret } from 'xstate';
import { state$, service, stateMachine, Service } from './main';
console.log(state$, service);
const localService: Service = interpret(
  stateMachine.withConfig({
    delays: {
      BREAK_PROPOSAL: 20 * 1000,
      STOP_PROPOSAL: 10 * 1000,
    },
  })
).start();
console.log(localService);
localService.onTransition((state) => {
  console.log(state.toStrings());
  console.log(state);
});
localService.send({ type: 'START' });
const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`;
