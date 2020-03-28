import * as React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="256" cy="256" r="256" fill="#eee"/><path fill="#a2001d" d="M256 0A256 256 0 0 0 16 167h480A256 256 0 0 0 256 0z"/><path fill="#0052b4" d="M256 512a256 256 0 0 0 240-167H16a256 256 0 0 0 240 167z"/></svg>
`;

const NederlandsFlag = () => (
  <SvgXml
    xml={xml}
    width="100%"
    height="100%"
  />
);

export default NederlandsFlag;
