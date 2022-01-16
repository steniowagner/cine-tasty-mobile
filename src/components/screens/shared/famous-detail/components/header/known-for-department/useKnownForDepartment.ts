import { useCallback, useMemo, useState } from 'react';

import metrics from '@styles/metrics';

const useKnownForDepartment = () => {
  const [textWidth, setTextWidth] = useState<number>(metrics.width);

  const onGetTextWidth = useCallback((width: number) => {
    setTextWidth(width);
  }, []);

  const opacity = useMemo(() => (textWidth === metrics.width ? 0 : 1), [textWidth]);

  return {
    width: textWidth,
    onGetTextWidth,
    opacity,
  };
};

export default useKnownForDepartment;
