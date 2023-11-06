export const debounce = <T extends (...args: any[]) => any>(
  timeoutCallback: T,
  delay: number,
) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  const debounced = (...args: Parameters<T>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => timeoutCallback(...args), delay);
  };

  return debounced as (...args: Parameters<T>) => ReturnType<T>;
};
