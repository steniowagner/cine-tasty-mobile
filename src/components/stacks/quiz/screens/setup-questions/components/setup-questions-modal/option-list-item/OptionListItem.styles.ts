import { TouchableOpacityProps } from 'react-native';
import styled, { IStyledComponent } from 'styled-components/native';
import { Substitute } from 'styled-components/native/dist/types';

import { Typography } from '@common-components';
import { dark } from '@styles/themes';

type ListItemStyleProps = {
  isSelected: boolean;
};

export const ListItemWrapper: IStyledComponent<
  'native',
  Substitute<TouchableOpacityProps, ListItemStyleProps>
> = styled.TouchableOpacity<ListItemStyleProps>`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getWidthFromDP('20')}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.metrics.lg}px;
  background-color: ${({ isSelected }) =>
    isSelected ? dark.colors.background : dark.colors.text};
`;

export const ListItemText = styled(
  Typography.SmallText,
).attrs<ListItemStyleProps>(({ isSelected }) => ({
  color: isSelected ? dark.colors.text : dark.colors.buttonText,
}))``;
