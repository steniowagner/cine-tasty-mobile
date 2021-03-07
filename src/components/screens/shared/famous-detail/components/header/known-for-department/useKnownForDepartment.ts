import { useCallback, useState } from 'react';
import metrics from 'styles/metrics';

type State = {
  onGetTextWidth: (width: number) => void;
  opacity: number;
  width: number;
};

const useKnownForDepartment = (): State => {
  const [textWidth, setTextWidth] = useState<number>(metrics.width);

  const onGetTextWidth = useCallback((width: number) => {
    setTextWidth(width);
  }, []);

  return {
    opacity: !textWidth ? 0 : 1,
    width: textWidth,
    onGetTextWidth,
  };
};

export default useKnownForDepartment;
