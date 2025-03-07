export const debounce = (cb: any, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return function (...args: any) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};
