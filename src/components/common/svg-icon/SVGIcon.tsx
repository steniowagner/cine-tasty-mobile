import React, { useMemo } from 'react';
import { StyleProp } from 'react-native';
import { withTheme, DefaultTheme, Colors } from 'styled-components';
import { SvgXml } from 'react-native-svg';

import getXML, { SupportedIcons } from './getXML';

export type Props = {
  colorThemeRef?: keyof Colors;
  style?: StyleProp<any>;
  theme: DefaultTheme;
  id: SupportedIcons;
  size: number;
};

const SVGIcon = ({
  colorThemeRef, style, theme, size, id,
}: Props) => {
  const xml = useMemo(() => {
    let color: string = theme.colors.text;

    if (colorThemeRef) {
      color = theme.colors[colorThemeRef];
    }

    return getXML(id, color);
  }, [colorThemeRef, theme]);

  return (
    <SvgXml
      xml={xml}
      width={size}
      height={size}
      testID={`icon-${id}`}
      style={style || {}}
    />
  );
};

export default withTheme(SVGIcon);
