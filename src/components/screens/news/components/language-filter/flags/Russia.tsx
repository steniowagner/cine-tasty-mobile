import * as React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="256" cy="256" r="256" fill="#eee"/><path fill="#0052b4" d="M496 345a255.4 255.4 0 0 0 0-178H16a255.5 255.5 0 0 0 0 178l240 22.3L496 345z"/><path fill="#d80027" d="M256 512a256 256 0 0 0 240-167H16a256 256 0 0 0 240 167z"/></svg>
`;

const RussiaFlag = () => (
  <SvgXml
    xml={xml}
    width="100%"
    height="100%"
  />
);

export default RussiaFlag;
