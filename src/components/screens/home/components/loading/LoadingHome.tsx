import React from 'react';
import {View} from 'react-native';

import {LoadingPlaceholder} from '@components';

import * as Styles from './LoadingHome.styles';
import * as Top3Styles from '../top3/Top3.styles';

export const LoadingHome = () => (
  <Top3Styles.ListWrapper testID="loading-home">
    <Styles.Wrapper>
      <Styles.LeftItemWrapper>
        <LoadingPlaceholder
          indexToDelayAnimation={2}
          style={Styles.sheet.loading}
        />
        <Styles.LoadingSmokeShadow />
      </Styles.LeftItemWrapper>
      <View>
        <LoadingPlaceholder
          indexToDelayAnimation={1}
          style={Styles.sheet.loading}
        />
        <Styles.LoadingSmokeShadow />
      </View>
      <Styles.RightItemWrapper>
        <LoadingPlaceholder
          indexToDelayAnimation={0}
          style={Styles.sheet.loading}
        />
        <Styles.LoadingSmokeShadow />
      </Styles.RightItemWrapper>
    </Styles.Wrapper>
  </Top3Styles.ListWrapper>
);
