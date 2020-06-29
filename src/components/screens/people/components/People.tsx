/* eslint-disable react/display-name */

import React, { useLayoutEffect } from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components';

import HeaderIconButton from 'components/common/HeaderIconButton';

import { PeopleStackParams } from '../routes/route-params-types';

const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
`;

type PeopleScreenNavigationProp = StackNavigationProp<PeopleStackParams, 'PEOPLE'>;

type Props = {
  navigation: PeopleScreenNavigationProp;
};

const People = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderIconButton
          onPress={() => navigation.navigate('SEARCH_PERSON')}
          iconName="magnify"
          withMarginRight
        />
      ),
    });
  }, []);

  return <Wrapper />;
};

export default People;
