import * as React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffda44" d="M0 256c0 31.3 5.6 61.3 16 89l240 22.3L496 345a255.5 255.5 0 0 0 0-178l-240-22.3L16 167a255.5 255.5 0 0 0-16 89z"/><path fill="#d80027" d="M496 167a256 256 0 0 0-480 0h480zM16 345a256 256 0 0 0 480 0H16z"/></svg>
`;

const SpainFlag = () => (
  <SvgXml
    xml={xml}
    width="100%"
    height="100%"
  />
);

export default SpainFlag;
