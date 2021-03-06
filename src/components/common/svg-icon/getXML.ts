import getDefaultIcons, { Icons } from './icons';
import flags, { FlagsIcons } from './flags';

export type SupportedIcons = Icons | FlagsIcons;

const getIconSVG = (id: SupportedIcons, color: string): string => {
  const XMLIconsMapping: Record<SupportedIcons, string> = {
    ...getDefaultIcons(color),
    ...flags,
  };

  return XMLIconsMapping[id];
};

export default getIconSVG;
