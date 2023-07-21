import React from 'react';

import {Icons} from '@src/components/common/svg-icon/icons';

import {SupportLink} from './support-link/SupportLink';
import * as Styles from './SupportLinks.styles';
import {useSupportLinks} from './useSupportLinks';

export const SupportLinks = () => {
  const supportLinks = useSupportLinks();
  return (
    <>
      {supportLinks.items.map(item => (
        <Styles.SectionWrapper key={item.title}>
          <SupportLink
            description={item.description}
            buttonText={item.buttonText}
            icon={item.icon as Icons}
            title={item.title}
            url={item.url}
          />
        </Styles.SectionWrapper>
      ))}
    </>
  );
};
