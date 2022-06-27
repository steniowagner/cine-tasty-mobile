import React from 'react';

import {SVGIconProps, SVGIcon} from '.';

type RenderSVGIconConditionallyProps = {
  ifFalse: Omit<SVGIconProps, 'theme'>;
  ifTrue: Omit<SVGIconProps, 'theme'>;
  condition: boolean;
};

export const renderSVGIconConditionally = (
  props: RenderSVGIconConditionallyProps,
) =>
  props.condition ? (
    <SVGIcon
      colorThemeRef={props.ifTrue.colorThemeRef}
      style={props.ifTrue.style}
      size={props.ifTrue.size}
      id={props.ifTrue.id}
    />
  ) : (
    <SVGIcon
      colorThemeRef={props.ifFalse.colorThemeRef}
      style={props.ifFalse.style}
      size={props.ifFalse.size}
      id={props.ifFalse.id}
    />
  );
