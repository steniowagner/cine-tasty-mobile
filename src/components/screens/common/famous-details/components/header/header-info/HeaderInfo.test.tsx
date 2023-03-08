jest.unmock('react-native-reanimated');
import React from 'react';
import {
  cleanup,
  render,
  RenderAPI,
  waitFor,
} from '@testing-library/react-native';
import {ThemeProvider} from 'styled-components/native';

import {dark as theme} from '@styles/themes/dark';
import {setupTimeTravel} from '@mocks/timeTravel';

import {HeaderInfo, HeaderInfoProps} from './HeaderInfo';
import {TMDBImageQualitiesProvider} from '@providers';

const KNOWN_FOR_DEPARTMENT = 'KNOWN_FOR_DEPARTMENT';
const PROFILE_IMAGE = 'PROFILE_IMAGE';
const PLACE_OF_BIRTH = 'PLACE_OF_BIRTH';
const BIRTH_DATE = '1994-02-21';
const NAME = 'STENIO WAGNER';

const renderHeaderInfo = (props: Partial<HeaderInfoProps>) => (
  <TMDBImageQualitiesProvider>
    <ThemeProvider theme={theme}>
      <HeaderInfo
        knownForDepartment={props.knownForDepartment ?? KNOWN_FOR_DEPARTMENT}
        profileImage={props.profileImage || PROFILE_IMAGE}
        placeOfBirth={props.placeOfBirth ?? PLACE_OF_BIRTH}
        isLoading={props.isLoading || false}
        birthDate={props.birthDate ?? BIRTH_DATE}
        name={props.name || NAME}
      />
    </ThemeProvider>
  </TMDBImageQualitiesProvider>
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

  describe('When the data is loading', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      setupTimeTravel();
    });

    afterEach(cleanup);

    it('should render the correctly', async () => {
      const component = render(
        renderHeaderInfo({
          isLoading: true,
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

  describe('When the data is loaded', () => {
    it('should only show render corretly when all the data is presented', async () => {
      const component = render(renderHeaderInfo({}));
      expect(elements.loadingHeaderPlaceholder(component)).toBeNull();
      expect(elements.profileImage(component)).not.toBeNull();
      expect(elements.name(component)).not.toBeNull();
      expect(elements.name(component).children[0]).toEqual(NAME);
      expect(elements.textContentWrapper(component)).not.toBeNull();
      expect(elements.birthday(component)).not.toBeNull();
      expect(elements.placeOfBirth(component)).not.toBeNull();
      expect(elements.placeOfBirth(component).children[0]).toEqual(
        PLACE_OF_BIRTH,
      );
      expect(elements.knownForDepartment(component)).not.toBeNull();
      expect(elements.knownForDepartment(component).children[0]).toEqual(
        KNOWN_FOR_DEPARTMENT,
      );
      await waitFor(() => {});
    });

    it('should not show the "BirthDate" when the "birthDate" is an empty string', async () => {
      const component = render(
        renderHeaderInfo({
          birthDate: '',
        }),
      );
      expect(elements.loadingHeaderPlaceholder(component)).toBeNull();
      expect(elements.profileImage(component)).not.toBeNull();
      expect(elements.name(component)).not.toBeNull();
      expect(elements.name(component).children[0]).toEqual(NAME);
      expect(elements.textContentWrapper(component)).not.toBeNull();
      expect(elements.birthday(component)).toBeNull();
      expect(elements.placeOfBirth(component)).not.toBeNull();
      expect(elements.placeOfBirth(component).children[0]).toEqual(
        PLACE_OF_BIRTH,
      );
      expect(elements.knownForDepartment(component)).not.toBeNull();
      expect(elements.knownForDepartment(component).children[0]).toEqual(
        KNOWN_FOR_DEPARTMENT,
      );
      await waitFor(() => {});
    });

    it('should not show the "PlaceOfBirth" when the "placeOfBirth" is an empty string', async () => {
      const component = render(
        renderHeaderInfo({
          placeOfBirth: '',
        }),
      );
      expect(elements.loadingHeaderPlaceholder(component)).toBeNull();
      expect(elements.profileImage(component)).not.toBeNull();
      expect(elements.name(component)).not.toBeNull();
      expect(elements.name(component).children[0]).toEqual(NAME);
      expect(elements.textContentWrapper(component)).not.toBeNull();
      expect(elements.birthday(component)).not.toBeNull();
      expect(elements.placeOfBirth(component)).toBeNull();
      expect(elements.knownForDepartment(component)).not.toBeNull();
      expect(elements.knownForDepartment(component).children[0]).toEqual(
        KNOWN_FOR_DEPARTMENT,
      );
      await waitFor(() => {});
    });

    it('should not show the "KnownForDepartment" when the "knownForDepartment" is an empty string', async () => {
      const component = render(
        renderHeaderInfo({
          knownForDepartment: '',
        }),
      );
      expect(elements.loadingHeaderPlaceholder(component)).toBeNull();
      expect(elements.profileImage(component)).not.toBeNull();
      expect(elements.name(component)).not.toBeNull();
      expect(elements.name(component).children[0]).toEqual(NAME);
      expect(elements.textContentWrapper(component)).not.toBeNull();
      expect(elements.birthday(component)).not.toBeNull();
      expect(elements.placeOfBirth(component)).not.toBeNull();
      expect(elements.placeOfBirth(component).children[0]).toEqual(
        PLACE_OF_BIRTH,
      );
      expect(elements.knownForDepartment(component)).toBeNull();
      await waitFor(() => {});
    });

    it('should not show the "PlaceOfBirth" and "BirthDate" when the "placeOfBirth" and "birthDate" are empty strings', async () => {
      const component = render(
        renderHeaderInfo({
          placeOfBirth: '',
          birthDate: '',
        }),
      );
      expect(elements.loadingHeaderPlaceholder(component)).toBeNull();
      expect(elements.profileImage(component)).not.toBeNull();
      expect(elements.name(component)).not.toBeNull();
      expect(elements.name(component).children[0]).toEqual(NAME);
      expect(elements.textContentWrapper(component)).not.toBeNull();
      expect(elements.birthday(component)).toBeNull();
      expect(elements.placeOfBirth(component)).toBeNull();
      expect(elements.knownForDepartment(component)).not.toBeNull();
      expect(elements.knownForDepartment(component).children[0]).toEqual(
        KNOWN_FOR_DEPARTMENT,
      );
      await waitFor(() => {});
    });

    it('should not show the "PlaceOfBirth", "BirthDate" and "KnownForDepartment" when the "placeOfBirth", "birthDate" and "knownForDepartment are empty strings', async () => {
      const component = render(
        renderHeaderInfo({
          knownForDepartment: '',
          placeOfBirth: '',
          birthDate: '',
        }),
      );
      expect(elements.loadingHeaderPlaceholder(component)).toBeNull();
      expect(elements.profileImage(component)).not.toBeNull();
      expect(elements.name(component)).not.toBeNull();
      expect(elements.name(component).children[0]).toEqual(NAME);
      expect(elements.textContentWrapper(component)).not.toBeNull();
      expect(elements.birthday(component)).toBeNull();
      expect(elements.placeOfBirth(component)).toBeNull();
      expect(elements.knownForDepartment(component)).toBeNull();
      await waitFor(() => {});
    });
  });
});
