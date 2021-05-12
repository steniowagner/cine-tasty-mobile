import { useCallback, useMemo } from 'react';

const MAX_STARS = 5;

type UseStarsVotesProps = {
  votes: number;
};

const useStarsVotes = (props: UseStarsVotesProps) => {
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

  const getStars = useMemo(() => {
    if (props.votes > 10) {
      return {
        numberFullStars: MAX_STARS,
        numberEmptyStars: 0,
        numberHalfStars: 0,
      };
    }

    if (props.votes <= 0) {
      return {
        numberEmptyStars: MAX_STARS,
        numberFullStars: 0,
        numberHalfStars: 0,
      };
    }

    const numberFullStars = getNumberFullStars(props.votes);
    const numberHalfStars = getNumberHalfStars(props.votes, numberFullStars);
    const numberEmptyStars = getNumberEmtpyStars(numberFullStars, numberHalfStars);

    return {
      numberEmptyStars,
      numberFullStars,
      numberHalfStars,
    };
  }, [props.votes]);

  return {
    ...getStars,
  };
};

export default useStarsVotes;
