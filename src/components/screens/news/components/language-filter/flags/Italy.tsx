import * as React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="256" cy="256" r="256" fill="#eee"/><path fill="#d80027" d="M512 256A256 256 0 0 0 345 16v480a256 256 0 0 0 167-240z"/><path fill="#6da544" d="M0 256a256 256 0 0 0 167 240V16A256 256 0 0 0 0 256z"/></svg>
`;

const ItalyFlag = () => (
  <SvgXml
    xml={xml}
    width="100%"
    height="100%"
  />
);

export default ItalyFlag;
