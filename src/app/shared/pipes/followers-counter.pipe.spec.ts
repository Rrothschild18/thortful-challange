import { FollowersCounterPipe } from './followers-counter.pipe';

describe('FollowersCounterPipe', () => {
  it('create an instance', () => {
    const pipe = new FollowersCounterPipe();
    expect(pipe).toBeTruthy();
  });
});
