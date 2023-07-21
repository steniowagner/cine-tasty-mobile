import React from 'react';

import * as TextIconButtonStyles from '../support-links/support-link/SupportLink.styles';
import {useSupportLibraries} from './useSupportLibraries';
import * as OpenSourceStyles from '../support-links/support-link/SupportLink.styles';
import * as Styles from './SupportLibraries.styles';

export const SupportLibraries = () => {
  const supportLibraries = useSupportLibraries();
  return (
    <>
      <OpenSourceStyles.SectionTitle testID="support-libraries-title">
        {supportLibraries.texts.title}
      </OpenSourceStyles.SectionTitle>
      <OpenSourceStyles.SectionDescrpition testID="support-libraries-description">
        {supportLibraries.texts.description}
      </OpenSourceStyles.SectionDescrpition>
      <Styles.Wrapper>
        {supportLibraries.libraries.map(library => (
          <Styles.TextWrapper key={library}>
            <TextIconButtonStyles.DefaultText
              testID={`support-library-${library}`}>
              {library}
            </TextIconButtonStyles.DefaultText>
          </Styles.TextWrapper>
        ))}
      </Styles.Wrapper>
    </>
  );
};
