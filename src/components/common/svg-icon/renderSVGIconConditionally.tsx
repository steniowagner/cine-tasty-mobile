import React from 'react';
import SVGIcon, { SVGIconProps } from '@components/common/svg-icon/SVGIcon';

type RenderSVGIconConditionallyProps = {
  ifFalse: Omit<SVGIconProps, 'theme'>;
  ifTrue: Omit<SVGIconProps, 'theme'>;
  condition: boolean;
};

const renderSVGIconConditionally = (props: RenderSVGIconConditionallyProps) => {
  if (props.condition) {
    return (
      <SVGIcon
        colorThemeRef={props.ifTrue.colorThemeRef}
        style={props.ifTrue.style}
        size={props.ifTrue.size}
        id={props.ifTrue.id}
      />
    );
  }

  return (
    <SVGIcon
      colorThemeRef={props.ifFalse.colorThemeRef}
      style={props.ifFalse.style}
      size={props.ifFalse.size}
      id={props.ifFalse.id}
    />
  );
};

export default renderSVGIconConditionally;
