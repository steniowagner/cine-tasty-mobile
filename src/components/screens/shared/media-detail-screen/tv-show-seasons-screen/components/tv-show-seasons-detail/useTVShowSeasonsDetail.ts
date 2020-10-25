import { useCallback, useEffect, useState } from 'react';
import gql from 'graphql-tag';
import { useTranslation } from 'react-i18next';

import useImperativeQuery from 'utils/useImperativeQuery';
import {
  TVShowSeasonsDetail_tvShowSeason_episodes as Episode,
  TVShowSeasonsDetail_tvShowSeason as TVShowSeason,
  TVShowSeasonsDetailVariables,
  TVShowSeasonsDetail,
} from 'types/schema';

const TV_SHOW_SEASONS_DETAIL = gql`
  query TVShowSeasonsDetail($id: ID!, $season: Int!, $language: ISO6391Language) {
    tvShowSeason(id: $id, season: $season, language: $language) {
      seasonNumber
      posterPath
      overview
      id
      episodes {
        voteAverage
        stillPath
        voteCount
        overview
        airDate
        id
        name
      }
    }
  }
`;

const INITIAL_QUERY_STATE: QueryState = {
  seasonDetail: undefined,
  isLoading: true,
  hasError: false,
};

const INITIAL_MODAL_STATE: ModalState = {
  isEpisodeDetailModalOpen: false,
  isOverviewModalOpen: false,
  modalContent: undefined,
};

type QueryState = {
  seasonDetail: TVShowSeason | undefined;
  isLoading: boolean;
  hasError: boolean;
};

type ModalState = {
  modalContent: Episode | string | undefined;
  isEpisodeDetailModalOpen: boolean;
  isOverviewModalOpen: boolean;
};

type State = {
  onPressOverviewReadMoreButton: (overview: string) => void;
  onPressEpisodeButton: (episode: Episode) => void;
  onPressCloseModal: () => void;
  t: (key: string) => string;
} & QueryState &
  ModalState;

type Props = {
  season: number;
  id: string;
};

const useTVShowSeasonsDetail = ({ season, id }: Props): State => {
  const [queryState, setQueryState] = useState<QueryState>(INITIAL_QUERY_STATE);
  const [modalState, setModalState] = useState<ModalState>(INITIAL_MODAL_STATE);

  const { t } = useTranslation();

  const execQuery = useImperativeQuery<TVShowSeasonsDetail, TVShowSeasonsDetailVariables>(
    TV_SHOW_SEASONS_DETAIL,
  );

  const onQueryTVShowSeason = useCallback(async () => {
    const { data, errors } = await execQuery({
      season,
      id,
    });

    if (errors) {
      setQueryState(() => ({
        seasonDetail: undefined,
        isLoading: false,
        hasError: true,
      }));

      return;
    }

    setQueryState(() => ({
      seasonDetail: data.tvShowSeason,
      isLoading: false,
      hasError: false,
    }));
  }, []);

  useEffect(() => {
    onQueryTVShowSeason();
  }, []);

  const onPressOverviewReadMoreButton = useCallback((overview: string) => {
    setModalState({
      ...INITIAL_MODAL_STATE,
      isOverviewModalOpen: true,
      modalContent: overview,
    });
  }, []);

  const onPressEpisodeButton = useCallback((episode: Episode) => {
    setModalState({
      ...INITIAL_MODAL_STATE,
      isEpisodeDetailModalOpen: true,
      modalContent: episode,
    });
  }, []);

  const onPressCloseModal = useCallback(() => {
    setModalState(INITIAL_MODAL_STATE);
  }, []);

  return {
    isEpisodeDetailModalOpen: modalState.isEpisodeDetailModalOpen,
    isOverviewModalOpen: modalState.isOverviewModalOpen,
    modalContent: modalState.modalContent,
    seasonDetail: queryState.seasonDetail,
    onPressOverviewReadMoreButton,
    isLoading: queryState.isLoading,
    hasError: queryState.hasError,
    onPressEpisodeButton,
    onPressCloseModal,
    t,
  };
};

export default useTVShowSeasonsDetail;
