import React from 'react';

import {SupportLink} from './support-link/SupportLink';
import * as Styles from './SupportLinks.styles';
import {useSupportLinks} from './useSupportLinks';

export const SupportLinks = () => {
  const supportLinks = useSupportLinks();
  return (
    <>
      {supportLinks.items.map(item => {
        const {IconComponent} = item;
        return (
          <Styles.SectionWrapper key={item.title} testID="support-links">
            <SupportLink
              description={item.description}
              buttonText={item.buttonText}
              icon={item.icon}
              title={item.title}
              url={item.url}
            />
            {IconComponent}
          </Styles.SectionWrapper>
        );
      })}
    </>
  );
};
