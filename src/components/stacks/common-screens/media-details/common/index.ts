import styled from 'styled-components/native';

export { BackgroundImage } from './background-image/BackgroundImage';
export { MediaDetailsLoading } from './loading/MediaDetailsLoading';
export { Header } from './header/Header';
export { MediaInfo } from './media-info/MediaInfo';
export { Videos } from './videos/Videos';
export { ParticipantsList } from './participants-list/ParticipantsList';

export const TextContentWrapper = styled.View`
  padding-top: ${({ theme }) => theme.metrics.lg}px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const SectionContentWrapper = styled.View`
  margin-top: ${({ theme }) => theme.metrics.sm}px;
`;

export const SectionWrapper = styled.View`
  margin-top: ${({ theme }) => theme.metrics.lg * 2}px;
`;

export const OverviewWrapper = styled.View`
  padding-horizontal: ${({ theme }) => theme.metrics.md}px;
`;
