import { useState } from 'react';

type State = {
  onPressListItem: () => void;
  onCloseModal: () => void;
  isModalOpen: boolean;
};

const useTVShowSeasonsListItem = (): State => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return {
    onPressListItem: () => setIsModalOpen(true),
    onCloseModal: () => setIsModalOpen(false),
    isModalOpen,
  };
};

export default useTVShowSeasonsListItem;
