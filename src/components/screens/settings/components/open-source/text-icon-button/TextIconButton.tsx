import React from 'react';
import {Linking} from 'react-native';

import {SVGIcon, Icons} from '@components/common';
import {useTheme} from 'styled-components/native';

import * as Styles from './TextIconButton.styles';

type TextIconButtonProps = {
  text: string;
  icon?: Icons;
  url: string;
};

const TextIconButton = ({icon, text, url}: TextIconButtonProps) => {
  const theme = useTheme();

  return (
    <Styles.Wrapper onPress={() => Linking.openURL(url)}>
      <Styles.DefaultText>{text}</Styles.DefaultText>
      {icon && (
        <>
          <Styles.GapSpace />
          <SVGIcon
            size={theme.metrics.getWidthFromDP('7%')}
            colorThemeRef="buttonText"
            id={icon}
          />
        </>
      )}
    </Styles.Wrapper>
  );
};

export default TextIconButton;
