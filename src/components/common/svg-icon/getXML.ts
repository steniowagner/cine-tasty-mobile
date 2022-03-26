import {getDefaultIcons, FlagsIcons, Icons, flags} from '.';

export type SupportedIcons = Icons | FlagsIcons;

export const getXML = (id: SupportedIcons, color: string) => {
  const XMLIconsMapping: Record<SupportedIcons, string> = {
    ...getDefaultIcons(color),
    ...flags,
  };
  return XMLIconsMapping[id];
};
