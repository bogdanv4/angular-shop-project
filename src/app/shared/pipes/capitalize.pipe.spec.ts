import { CreateImageStringPipe } from './capitalize.pipe';

describe('CreateImageStringPipe', () => {
  it('create an instance', () => {
    const pipe = new CreateImageStringPipe();
    expect(pipe).toBeTruthy();
  });
});
