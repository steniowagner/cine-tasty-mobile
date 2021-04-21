import { useState } from 'react';

const useTVShowSeasonsListItem = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return {
    onPressListItem: () => setIsModalOpen(true),
    onCloseModal: () => setIsModalOpen(false),
    isModalOpen,
  };
};

export default useTVShowSeasonsListItem;
