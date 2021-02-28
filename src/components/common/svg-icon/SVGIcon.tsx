import React, { useMemo } from 'react';
import { withTheme, DefaultTheme, Colors } from 'styled-components';
import { SvgXml } from 'react-native-svg';

import getXML, { SupportedIcons } from './getXML';

type Props = {
  colorThemeRef?: keyof Colors;
  theme: DefaultTheme;
  id: SupportedIcons;
  size: number;
};

const SVGIcon = ({
  colorThemeRef, theme, size, id,
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
    />
  );
};

export default withTheme(SVGIcon);
