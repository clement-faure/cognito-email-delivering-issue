export const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const getSleepDuration = (
  currentTry: number,
  minSleepInMilliseconds: number,
  maxSleepInMilliseconds: number
) => {
  currentTry = Math.max(0, currentTry);

  const currentSleepInMilliseconds =
    minSleepInMilliseconds * Math.pow(2, currentTry);

  return Math.min(currentSleepInMilliseconds, maxSleepInMilliseconds);
};
