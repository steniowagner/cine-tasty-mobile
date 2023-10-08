import React, { useMemo } from 'react';
import { StyleProp } from 'react-native';
import { useTheme, Colors } from 'styled-components/native';
import { SvgXml } from 'react-native-svg';

import { FlagsIcons, Icons, flags } from '.';
import { icons } from './icons';

type SupportedIcons = Icons | FlagsIcons;

export type SVGIconProps = {
  color?: keyof Colors;
  style?: StyleProp<any>;
  id: SupportedIcons;
  testID?: string;
  size: number;
};

const getXML = (id: SupportedIcons, color: string) => {
  const XMLIconsMapping: Record<SupportedIcons, string> = {
    ...icons(color),
    ...flags,
  };
  return XMLIconsMapping[id];
};

export const SVGIcon = (props: SVGIconProps) => {
  const theme = useTheme();

  const xml = useMemo(() => {
    if (!props.color) {
      return getXML(props.id, theme.colors.text);
    }
    return getXML(props.id, theme.colors[props.color] as string);
  }, [theme, props.color, props.id]);

  return (
    <SvgXml
      testID={props.testID || `icon-${props.id}`}
      style={props.style || {}}
      height={props.size}
      width={props.size}
      xml={xml}
    />
  );
};
