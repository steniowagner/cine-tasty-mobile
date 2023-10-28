import React, { useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  defaultHeaderStyle,
  Routes,
  HeaderTitle as CustomHeaderTitle,
} from '@navigation';
import { Translations } from '@i18n/tags';

import { Famous } from '../screens/famous/Famous';

const Stack = createStackNavigator();

export const FamousStack = () => {
  const HeaderTitle = useCallback(
    () => <CustomHeaderTitle translationTag={Translations.Tabs.TABS_FAMOUS} />,
    [],
  );

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          ...defaultHeaderStyle,
          headerTitle: HeaderTitle,
          headerTitleAlign: 'center',
        }}
        name={Routes.Famous.FAMOUS}
        component={Famous}
      />
    </Stack.Navigator>
  );
};
