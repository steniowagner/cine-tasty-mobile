import {useFormatDate} from '@utils';

type UseDeathDayProps = {
  day: string;
};

export const useDeathDay = (props: UseDeathDayProps) => {
  const formatDate = useFormatDate();

  return {
    text: formatDate.format(props.day),
  };
};
