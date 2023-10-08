import React from 'react';

import { SVGIconProps, SVGIcon } from '@common-components';

export type ConditionProps = Omit<SVGIconProps, 'theme'>;

type RenderSVGIconConditionallyParams = {
  ifFalse: ConditionProps;
  ifTrue: ConditionProps;
  condition: boolean;
};

export const renderSVGIconConditionally = (
  props: RenderSVGIconConditionallyParams,
) =>
  props.condition ? (
    <SVGIcon
      color={props.ifTrue.color}
      style={props.ifTrue.style}
      size={props.ifTrue.size}
      id={props.ifTrue.id}
    />
  ) : (
    <SVGIcon
      color={props.ifFalse.color}
      style={props.ifFalse.style}
      size={props.ifFalse.size}
      id={props.ifFalse.id}
    />
  );
