import * as React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffda44" d="M16 345a256 256 0 0 0 480 0l-240-22.2L16 345z"/><path fill="#333" d="M256 0A256 256 0 0 0 16 167l240 22.2L496 167A256 256 0 0 0 256 0z"/><path fill="#d80027" d="M16 167a255.5 255.5 0 0 0 0 178h480a255.4 255.4 0 0 0 0-178H16z"/></svg>
`;

const GermanFlag = () => (
  <SvgXml
    xml={xml}
    width="100%"
    height="100%"
  />
);

export default GermanFlag;
