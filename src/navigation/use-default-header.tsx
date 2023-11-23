import React, { useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import { HeaderTitle, getTransparentHeaderOptions } from '@navigation';
import { HeaderIconButton } from '@common-components';

type UseDefaultHeaderParams = {
  title: string;
};

export const useDefaultHeader = (params: UseDefaultHeaderParams) => {
  const navigation = useNavigation();
  const theme = useTheme();

  const HeaderLeft = useCallback(
    () => (
      <HeaderIconButton
        onPress={navigation.goBack}
        iconName="arrow-back"
        withMarginLeft
        color="text"
      />
    ),
    [],
  );

  const Title = useCallback(
    () => <HeaderTitle text={params.title} />,
    [params.title],
  );

  useEffect(() => {
    navigation.setOptions({
      ...getTransparentHeaderOptions(theme),
      headerTitle: Title,
      headerTitleAlign: 'center',
      headerLeft: HeaderLeft,
    });
  }, [HeaderLeft, Title, theme]);
};
