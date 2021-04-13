import React from 'react';
import SVGIcon, { Props as SVGIconProps } from '@components/common/svg-icon/SVGIcon';

type Props = {
  ifFalse: Omit<SVGIconProps, 'theme'>;
  ifTrue: Omit<SVGIconProps, 'theme'>;
  condition: boolean;
};

const renderSVGIconConditionally = ({ condition, ifFalse, ifTrue }: Props) => {
  if (condition) {
    return (
      <SVGIcon
        colorThemeRef={ifTrue.colorThemeRef}
        style={ifTrue.style}
        size={ifTrue.size}
        id={ifTrue.id}
      />
    );
  }

  return (
    <SVGIcon
      colorThemeRef={ifFalse.colorThemeRef}
      style={ifFalse.style}
      size={ifFalse.size}
      id={ifFalse.id}
    />
  );
};

export default renderSVGIconConditionally;
