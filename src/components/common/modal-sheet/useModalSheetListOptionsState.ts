import {useCallback, useState} from 'react';

type UseModalSheetListOptionsStateProps<T> = {
  lastItemSelected: T;
  onSelectItem: (item: T) => void;
  onCloseModal: () => void;
};

export const useModalSheetListOptionsState = <T>(
  props: UseModalSheetListOptionsStateProps<T>,
) => {
  const [itemSelected, setItemSelected] = useState<T>(props.lastItemSelected);

  const handlePressCTA = useCallback(() => {
    props.onSelectItem(itemSelected);
    props.onCloseModal();
  }, [props.onCloseModal, props.onSelectItem, itemSelected]);

  const handleCloseModal = useCallback(() => {
    setItemSelected(props.lastItemSelected);
    props.onCloseModal();
  }, [props.onCloseModal, props.lastItemSelected]);

  return {
    onPressCTA: handlePressCTA,
    onCloseModal: handleCloseModal,
    itemSelected,
  };
};
