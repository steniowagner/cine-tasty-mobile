import { useCallback, useMemo } from 'react';

const MAX_STARS = 5;

type State = {
  numberEmptyStars: number;
  numberFullStars: number;
  numberHalfStars: number;
};

const useStarsVotes = (votes: number): State => {
  const getNumberFullStars = useCallback(
    (allVotes: number): number => Math.floor(allVotes / 2),
    [],
  );

  const getNumberHalfStars = useCallback(
    (allVotes: number, numberFullStars: number): number => Math.ceil(allVotes / 2 - numberFullStars),
    [],
  );

  const getNumberEmtpyStars = useCallback(
    (numberFullStars: number, numberHalfStars: number): number => MAX_STARS - (numberFullStars + numberHalfStars),
    [],
  );

  const getStars = useMemo((): State => {
    if (votes > 10) {
      return {
        numberFullStars: MAX_STARS,
        numberEmptyStars: 0,
        numberHalfStars: 0,
      };
    }

    if (votes <= 0) {
      return {
        numberEmptyStars: MAX_STARS,
        numberFullStars: 0,
        numberHalfStars: 0,
      };
    }

    const numberFullStars = getNumberFullStars(votes);
    const numberHalfStars = getNumberHalfStars(votes, numberFullStars);
    const numberEmptyStars = getNumberEmtpyStars(numberFullStars, numberHalfStars);

    return {
      numberEmptyStars,
      numberFullStars,
      numberHalfStars,
    };
  }, [votes]);

  return {
    ...getStars,
  };
};

export default useStarsVotes;
