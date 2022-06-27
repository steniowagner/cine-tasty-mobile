import React, {useMemo} from 'react';
import {StyleProp} from 'react-native';
import {withTheme, DefaultTheme, Colors} from 'styled-components/native';
import {SvgXml} from 'react-native-svg';

import {Icons, getXML} from '.';

export type SVGIconProps = {
  colorThemeRef?: keyof Colors;
  style?: StyleProp<any>;
  theme: DefaultTheme;
  id: Icons;
  size: number;
};

export const SVGIcon = withTheme((props: SVGIconProps) => {
  const xml = useMemo(() => {
    if (!props.colorThemeRef) {
      return getXML(props.id, props.theme.colors.text);
    }
    return getXML(props.id, props.theme.colors[props.colorThemeRef]);
  }, [props.theme, props.colorThemeRef, props.id]);

  return (
    <SvgXml
      testID={`icon-${props.id}`}
      style={props.style || {}}
      height={props.size}
      width={props.size}
      xml={xml}
    />
  );
});
