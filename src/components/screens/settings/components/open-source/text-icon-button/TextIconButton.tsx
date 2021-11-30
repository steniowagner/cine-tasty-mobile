import React from 'react';
import { Linking } from 'react-native';

import SVGIcon from '@components/common/svg-icon/SVGIcon';
import { Icons } from '@components/common/svg-icon/icons';
import { useTheme } from 'styled-components';

import * as Styles from './TextIconButton.styles';

type TextIconButtonProps = {
  text: string;
  icon?: Icons;
  url: string;
};

const TextIconButton = ({ icon, text, url }: TextIconButtonProps) => {
  const theme = useTheme();

  return (
    <Styles.Wrapper
      onPress={() => Linking.openURL(url)}
    >
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
