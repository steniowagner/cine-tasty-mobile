import MockDate from 'mockdate';

const FRAME_TIME = 10;

export const setupTimeTravel = () => {
  MockDate.set(0);
  jest.useFakeTimers();
};

const advanceOneFrame = () => {
  const now = Date.now();
  MockDate.set(new Date(now + FRAME_TIME));
  jest.advanceTimersByTime(FRAME_TIME);
};

const timeTravel = (msToAdvance = FRAME_TIME) => {
  const numberOfFramesToRun = msToAdvance / FRAME_TIME;
  let framesElapsed = 0;

  while (framesElapsed < numberOfFramesToRun) {
    advanceOneFrame();
    framesElapsed += 1;
  }
};

export default timeTravel;
