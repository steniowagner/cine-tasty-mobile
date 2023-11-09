import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { RenderAPI, render, waitFor } from '@testing-library/react-native';

import { TMDBImageQualitiesProvider } from '@/providers';
import { dark as theme } from '@styles/themes';

import { Header, HeaderProps } from './Header';

const renderHeader = (props: HeaderProps) => (
  <ThemeProvider theme={theme}>
    <TMDBImageQualitiesProvider>
      <Header
        knownForDepartment={props.knownForDepartment}
        profileImage={props.profileImage}
        placeOfBirth={props.placeOfBirth}
        isLoading={props.isLoading}
        birthDate={props.birthDate}
        name={props.name}
      />
    </TMDBImageQualitiesProvider>
  </ThemeProvider>
);

describe('Common-screens/FamousDetails/Header', () => {
  const elements = {
    loading: (api: RenderAPI) =>
      api.queryByTestId('loading-header-placeholder'),
    image: (api: RenderAPI) => api.queryByTestId('tmdb-fallback-image'),
    name: (api: RenderAPI) => api.queryByTestId('name-text'),
    birthday: (api: RenderAPI) => api.queryByTestId('birthday-text'),
    placeOfBirth: (api: RenderAPI) => api.queryByTestId('place-of-birth-text'),
    knownForDepartment: (api: RenderAPI) =>
      api.queryByTestId('known-for-department-text'),
    contentWrapper: (api: RenderAPI) =>
      api.queryByTestId('text-content-wrapper'),
  };

  describe('When "isLoading" is "true"', () => {
    it('should render correctly when "isLoading" is "true"', async () => {
      const component = render(renderHeader({ isLoading: true }));
      expect(elements.loading(component)).not.toBeNull();
      expect(elements.contentWrapper(component)).toBeNull();
      expect(elements.image(component)).not.toBeNull();
      expect(elements.name(component)).not.toBeNull();
      await waitFor(() => {});
    });
  });

  describe('When "isLoading" is "false"', () => {
    it('should render correctly when "isLoading" is "true"', async () => {
      const component = render(renderHeader({ isLoading: false }));
      expect(elements.loading(component)).toBeNull();
      expect(elements.contentWrapper(component)).not.toBeNull();
      expect(elements.image(component)).not.toBeNull();
      expect(elements.name(component)).not.toBeNull();
      await waitFor(() => {});
    });

    describe('Birthday', () => {
      it('should correctly when it is "defined"', async () => {
        const component = render(
          renderHeader({ isLoading: false, birthDate: '1994-02-21' }),
        );
        expect(elements.birthday(component)).not.toBeNull();
        await waitFor(() => {});
      });
    });

    describe('Place of birth', () => {
      it('should correctly when it is "defined"', async () => {
        const placeOfBirth = 'Fortaleza, Ceará, Brazil 😎';
        const component = render(
          renderHeader({ isLoading: false, placeOfBirth }),
        );
        expect(elements.placeOfBirth(component)!.children[0]).toEqual(
          placeOfBirth,
        );
        await waitFor(() => {});
      });

      it('should correctly when it is "undefined"', async () => {
        const component = render(renderHeader({ isLoading: false }));
        expect(elements.placeOfBirth(component)!.children[0]).toEqual('-');
        await waitFor(() => {});
      });
    });

    describe('Known for department', () => {
      it('should correctly when it is "defined"', async () => {
        const knownForDepartment = 'Acting';
        const component = render(
          renderHeader({ isLoading: false, knownForDepartment }),
        );
        expect(elements.knownForDepartment(component)?.children[0]).toEqual(
          knownForDepartment,
        );
        await waitFor(() => {});
      });

      it('should correctly when it is "undefined"', async () => {
        const component = render(renderHeader({ isLoading: false }));
        expect(elements.knownForDepartment(component)).toBeNull();
        await waitFor(() => {});
      });
    });
  });
});
