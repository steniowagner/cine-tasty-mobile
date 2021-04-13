import { useCallback, useState } from 'react';

import metrics from '@styles/metrics';

const useKnownForDepartment = () => {
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
