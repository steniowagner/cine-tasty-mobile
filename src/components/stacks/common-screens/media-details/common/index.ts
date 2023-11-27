import styled from 'styled-components/native';

export { BackgroundImage } from './background-image/BackgroundImage';
export { MediaDetailsLoading } from './loading/MediaDetailsLoading';
export { Header } from './header/Header';
export { MediaInfo } from './media-info/MediaInfo';
export { Videos } from './videos/Videos';
export { ParticipantsList } from './participants-list/ParticipantsList';

export const TextContentWrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
`;

export const SectionContentWrapper = styled.View`
  padding-horizontal: ${({ theme }) => theme.metrics.md}px;
  margin-top: ${({ theme }) => theme.metrics.sm}px;
`;

export const SectionWrapper = styled.View`
  margin-top: ${({ theme }) => theme.metrics.xl}px;
`;
