import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { withTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';

import { getDefaultHeaderOptions } from 'routes/constants';

import SearchPerson from '../components/search-person/SeachPerson';
import People from '../components/People';
import LOCAL_ROUTES from './route-names';

const Stack = createStackNavigator();

const PeopleStack = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          ...getDefaultHeaderOptions(),
          headerTitle: t('translations:tabs:people'),
        }}
        initialParams={{
          headerTitle: t('translations:tabs:people'),
        }}
        name={LOCAL_ROUTES.PEOPLE.id}
        component={People}
      />
      <Stack.Screen
        options={{
          ...getDefaultHeaderOptions(),
        }}
        initialParams={{
          searchBarPlaceholder: t('translations:people:searchBarPlaceholder'),
        }}
        name={LOCAL_ROUTES.SEARCH_PERSON.id}
        component={SearchPerson}
      />
    </Stack.Navigator>
  );
};

const Wrapper = (props: any) => (
  <PeopleStack
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
);

export const TabID = LOCAL_ROUTES.PEOPLE.id;

export default withTheme(Wrapper);
