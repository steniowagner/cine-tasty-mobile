import React from 'react';

import {Icons} from '@components/common';

import TextIconButton from './text-icon-button/TextIconButton';
import * as Styles from './OpenSource.styles';

type DefaultOpenSourceItemProps = {
  children?: JSX.Element;
  description: string;
  buttonText: string;
  title: string;
  icon: Icons;
  url: string;
};

const DefaultOpenSourceItem = ({
  description,
  buttonText,
  children,
  title,
  icon,
  url,
}: DefaultOpenSourceItemProps) => (
  <>
    <Styles.SectionTitle>{title}</Styles.SectionTitle>
    <Styles.SectionDescrpition>{description}</Styles.SectionDescrpition>
    {children && <>{children}</>}
    <TextIconButton icon={icon} text={buttonText} url={url} />
  </>
);

export default DefaultOpenSourceItem;
