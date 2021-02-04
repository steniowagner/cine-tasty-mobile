import React, { useMemo } from 'react';
import { withTheme, DefaultTheme } from 'styled-components';
import { SvgXml } from 'react-native-svg';

import getXML, { SupportedIcons } from './getXML';

type Props = {
  theme: DefaultTheme;
  id: SupportedIcons;
  color?: string;
};

const SVGIcon = ({ theme, color, id }: Props) => {
  const xml = useMemo(() => getXML({ theme, color, id }), [color, theme]);

  return (
    <SvgXml
      xml={xml}
      width="100%"
      height="100%"
    />
  );
};

export default withTheme(SVGIcon);
