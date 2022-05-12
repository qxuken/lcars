import { getPhaseDuration } from './getPhaseDuration';
import { Phase } from './model';

describe('getPhaseDuration', () => {
  it('should return None for Idle', () => {
    expect(getPhaseDuration(Phase.Idle, 0, 0).isNone).toBeTruthy();
  });
  it('should return Some(25) for Focus', () => {
    expect(getPhaseDuration(Phase.Focus, 0, 0).some()).toBe(25);
  });
  it('should return Some(20) for Focus after 5min interruption', () => {
    expect(getPhaseDuration(Phase.Focus, 5, 0).some()).toBe(20);
  });
  it('should return Some(10) for Break after sub 25min Focus', () => {
    expect(getPhaseDuration(Phase.Break, 25, 0).some()).toBe(10);
  });
  it('should return Some(15) for Break after sub 50min Focus', () => {
    expect(getPhaseDuration(Phase.Break, 50, 0).some()).toBe(15);
  });
  it('should return Some(20) for Break after sub 90min Focus', () => {
    expect(getPhaseDuration(Phase.Break, 90, 0).some()).toBe(20);
  });
  it('should return Some(35) for Break after 90min plus Focus', () => {
    expect(getPhaseDuration(Phase.Break, 91, 0).some()).toBe(35);
  });
  it('should add 15 and return Some(25) for Break after 4 Focus', () => {
    expect(getPhaseDuration(Phase.Break, 0, 4).some()).toBe(25);
  });
});
