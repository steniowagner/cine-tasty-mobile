import React, {useMemo} from 'react';
import {StyleProp} from 'react-native';
import {withTheme, DefaultTheme, Colors} from 'styled-components/native';
import {SvgXml} from 'react-native-svg';

import getXML, {SupportedIcons} from './getXML';

export type SVGIconProps = {
  colorThemeRef?: keyof Colors;
  style?: StyleProp<any>;
  theme: DefaultTheme;
  id: SupportedIcons;
  size: number;
};

const SVGIcon = (props: SVGIconProps) => {
  const xml = useMemo(() => {
    let color: string = props.theme.colors.text;

    if (props.colorThemeRef) {
      color = props.theme.colors[props.colorThemeRef];
    }

    return getXML(props.id, color);
  }, [props]);

  return (
    <SvgXml
      xml={xml}
      width={props.size}
      height={props.size}
      testID={`icon-${props.id}`}
      style={props.style || {}}
    />
  );
};

export default withTheme(SVGIcon);
