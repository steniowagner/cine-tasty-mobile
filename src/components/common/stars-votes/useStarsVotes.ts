import {useCallback, useMemo} from 'react';

const MAX_STARS = 5;

type UseStarsVotesProps = {
  withText?: boolean;
  voteCount?: number;
  votes: number;
};

export const useStarsVotes = (props: UseStarsVotesProps) => {
  const getNumberFullStars = useCallback(
    (allVotes: number) => Math.floor(allVotes / 2),
    [],
  );

  const getNumberHalfStars = useCallback(
    (allVotes: number, numberFullStars: number) =>
      Math.ceil(allVotes / 2 - numberFullStars),
    [],
  );

  const getNumberEmtpyStars = useCallback(
    (numberFullStars: number, numberHalfStars: number) =>
      MAX_STARS - (numberFullStars + numberHalfStars),
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
    const numberEmptyStars = getNumberEmtpyStars(
      numberFullStars,
      numberHalfStars,
    );
    return {
      numberEmptyStars,
      numberFullStars,
      numberHalfStars,
    };
  }, [props.votes]);

  const votes = useMemo(
    () => (props.votes > 10 ? '10.0 ' : `${props.votes.toFixed(1)} `),
    [props.votes],
  );

  return {
    ...getStars,
    shouldShowVoteCount: props.withText && !!props.voteCount,
    shouldShowVotes: props.withText && !!props.votes,
    votes,
  };
};
