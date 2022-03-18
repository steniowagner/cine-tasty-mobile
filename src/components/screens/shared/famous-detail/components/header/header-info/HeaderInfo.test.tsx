import React from 'react';
import {
  cleanup,
  render,
  RenderAPI,
  act,
  waitFor,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';
import timeTravel, {setupTimeTravel} from '@mocks/timeTravel';

import HeaderInfo, {HeaderInfoProps} from './HeaderInfo';
import {TMDBImageQualityProvider} from '@providers';
import {ANIMATION_DURATION} from '@src/hooks/useLoadListItemImage';

const KNOWN_FOR_DEPARTMENT = 'KNOWN_FOR_DEPARTMENT';
const PROFILE_IMAGE = 'PROFILE_IMAGE';
const PLACE_OF_BIRTH = 'PLACE_OF_BIRTH';
const BIRTH_DATE = '1994-02-21';
const NAME = 'STENIO WAGNER';

const renderHeaderInfo = (props: HeaderInfoProps) => (
  <TMDBImageQualityProvider>
    <ThemeProvider theme={theme}>
      <HeaderInfo
        knownForDepartment={props.knownForDepartment}
        profileImage={props.profileImage}
        placeOfBirth={props.placeOfBirth}
        isLoading={props.isLoading}
        birthDate={props.birthDate}
        name={props.name}
      />
    </ThemeProvider>
  </TMDBImageQualityProvider>
);

describe('<HeaderInfo />', () => {
  const elements = {
    loadingHeaderPlaceholder: (api: RenderAPI) =>
      api.queryByTestId('loading-header-placeholder'),
    profileImage: (api: RenderAPI) => api.queryByTestId('profile-image'),
    name: (api: RenderAPI) => api.queryByTestId('name-text'),
    birthday: (api: RenderAPI) => api.queryByTestId('birthday-text'),
    placeOfBirth: (api: RenderAPI) => api.queryByTestId('place-of-birth'),
    knownForDepartment: (api: RenderAPI) =>
      api.queryByTestId('known-for-department-text'),
    textContentWrapper: (api: RenderAPI) =>
      api.queryByTestId('text-content-wrapper'),
  };

  beforeEach(() => {
    jest.useFakeTimers();
    setupTimeTravel();
  });

  afterEach(cleanup);

  describe('Loading-state', () => {
    it('should render the loading-state when the "isLoading" is "true"', async () => {
      const component = render(
        renderHeaderInfo({
          knownForDepartment: KNOWN_FOR_DEPARTMENT,
          profileImage: PROFILE_IMAGE,
          placeOfBirth: PLACE_OF_BIRTH,
          birthDate: BIRTH_DATE,
          isLoading: true,
          name: NAME,
        }),
      );
      expect(elements.loadingHeaderPlaceholder(component)).not.toBeNull();
      expect(elements.profileImage(component)).not.toBeNull();
      expect(elements.name(component)).not.toBeNull();
      expect(elements.textContentWrapper(component)).toBeNull();
      expect(elements.birthday(component)).toBeNull();
      expect(elements.placeOfBirth(component)).toBeNull();
      expect(elements.knownForDepartment(component)).toBeNull();
      await waitFor(() => {});
    });
  });

  describe('Full-content-state', () => {
    it('should only show the header-info content when the "isLoading" is "false"', async () => {
      const component = render(
        renderHeaderInfo({
          knownForDepartment: KNOWN_FOR_DEPARTMENT,
          profileImage: PROFILE_IMAGE,
          placeOfBirth: PLACE_OF_BIRTH,
          birthDate: BIRTH_DATE,
          isLoading: false,
          name: NAME,
        }),
      );
      act(() => {
        timeTravel(ANIMATION_DURATION);
      });
      expect(elements.loadingHeaderPlaceholder(component)).toBeNull();
      expect(elements.profileImage(component)).not.toBeNull();
      expect(elements.name(component)).not.toBeNull();
      expect(elements.textContentWrapper(component)).not.toBeNull();
      expect(elements.birthday(component)).not.toBeNull();
      expect(elements.placeOfBirth(component)).not.toBeNull();
      expect(elements.knownForDepartment(component)).not.toBeNull();
      await waitFor(() => {});
    });

    it('should not show the "birth-date" when the "birthDate" is an empty string', async () => {
      const component = render(
        renderHeaderInfo({
          knownForDepartment: KNOWN_FOR_DEPARTMENT,
          profileImage: PROFILE_IMAGE,
          placeOfBirth: PLACE_OF_BIRTH,
          birthDate: '',
          isLoading: false,
          name: NAME,
        }),
      );
      act(() => {
        timeTravel(ANIMATION_DURATION);
      });
      expect(elements.loadingHeaderPlaceholder(component)).toBeNull();
      expect(elements.profileImage(component)).not.toBeNull();
      expect(elements.name(component)).not.toBeNull();
      expect(elements.textContentWrapper(component)).not.toBeNull();
      expect(elements.birthday(component)).toBeNull();
      expect(elements.placeOfBirth(component)).not.toBeNull();
      expect(elements.knownForDepartment(component)).not.toBeNull();
      await waitFor(() => {});
    });

    it('should not show the "place-of-birth" when the "placeOfBirth" is an empty string', async () => {
      const component = render(
        renderHeaderInfo({
          knownForDepartment: KNOWN_FOR_DEPARTMENT,
          profileImage: PROFILE_IMAGE,
          placeOfBirth: '',
          birthDate: BIRTH_DATE,
          isLoading: false,
          name: NAME,
        }),
      );
      act(() => {
        timeTravel(ANIMATION_DURATION);
      });
      expect(elements.loadingHeaderPlaceholder(component)).toBeNull();
      expect(elements.profileImage(component)).not.toBeNull();
      expect(elements.name(component)).not.toBeNull();
      expect(elements.textContentWrapper(component)).not.toBeNull();
      expect(elements.birthday(component)).not.toBeNull();
      expect(elements.placeOfBirth(component)).toBeNull();
      expect(elements.knownForDepartment(component)).not.toBeNull();
      await waitFor(() => {});
    });

    it('should not show the "place-of-birth" and "birth-date" when the "placeOfBirth" and "birthDate" are empty strings', async () => {
      const component = render(
        renderHeaderInfo({
          knownForDepartment: KNOWN_FOR_DEPARTMENT,
          profileImage: PROFILE_IMAGE,
          placeOfBirth: '',
          birthDate: '',
          isLoading: false,
          name: NAME,
        }),
      );
      act(() => {
        timeTravel(ANIMATION_DURATION);
      });
      expect(elements.loadingHeaderPlaceholder(component)).toBeNull();
      expect(elements.profileImage(component)).not.toBeNull();
      expect(elements.name(component)).not.toBeNull();
      expect(elements.textContentWrapper(component)).not.toBeNull();
      expect(elements.birthday(component)).toBeNull();
      expect(elements.placeOfBirth(component)).toBeNull();
      expect(elements.knownForDepartment(component)).not.toBeNull();
      await waitFor(() => {});
    });
  });
});
