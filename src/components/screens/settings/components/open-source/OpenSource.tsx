import React from 'react';
import {ScrollView} from 'react-native';

import {Icons} from '@components/common';
import {CONSTANTS} from '@utils';

import SupportLibraries from './support-libraries/SupportLibraries';
import DefaultOpenSourceItem from './DefaultOpenSourceItem';
import * as Styles from './OpenSource.styles';
import useOpenSource from './useOpenSource';

const OpenSource = () => {
  const {items} = useOpenSource();

  return (
    <ScrollView
      contentContainerStyle={{
        padding: CONSTANTS.VALUES.DEFAULT_SPACING,
      }}>
      {items.map(item => {
        const {IconComponent} = item;

        return (
          <Styles.SectionWrapper key={item.title}>
            <DefaultOpenSourceItem
              description={item.description}
              buttonText={item.buttonText}
              icon={item.icon as Icons}
              title={item.title}
              url={item.url}>
              {IconComponent && IconComponent}
            </DefaultOpenSourceItem>
          </Styles.SectionWrapper>
        );
      })}
      <Styles.SectionWrapper>
        <SupportLibraries />
      </Styles.SectionWrapper>
    </ScrollView>
  );
};

export default OpenSource;
