import * as React from 'react';
import Svg, {Defs, Path, G} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: style, title */

const WalkerLogoComponent = props => (
  <Svg
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 336.81 72.3"
    {...props}>
    <Defs></Defs>
    <Path
      d="M74.23 26.72 55.59 55.65l-9.73-6.26 21.63-33.58a36.13 36.13 0 1 0 6.74 10.91ZM9.27 49.1l16-24.94 9.39 6.48L19 55.36Zm28 6.32-9.73-6.27 16-24.93 9.38 6.48Z"
      transform="translate(-4.44 -3.81)"
      style={{
        fill: '#026cb6',
      }}
    />
    <G id="Walker">
      <Path
        className="cls-2"
        d="m112.63 50.09 13.39-35 13.39 35 13.27-34h6.42l-19.69 49.3L126 30.66l-13.37 34.77L93 16.13h6.41ZM164.51 51.66l-5.41 11.88h-6.35l22.63-49.42L198 63.54h-6.35l-5.41-11.88Zm10.87-24.59L167 46.25h16.85ZM211.66 58.14h14.4v5.4h-20.31V16.13h5.91ZM259.76 16.13h7.74l-21.32 21.32 21.7 26.09h-8l-20.24-25v25h-5.91V16.13h5.91v20.56ZM275.23 16.13h25.47v5.41h-19.56v13.27h19v5.4h-19v17.93h19.56v5.4h-25.47ZM341.25 63.54h-7.17l-13.95-20.06-2.44-3.7v23.76h-5.91V16.13h7.16c4.22 0 8.74.06 12.51 2.2a13.11 13.11 0 0 1 6.23 11.32c0 6.79-4.53 12.45-11.38 13.27Zm-23.57-25h1.88c6 0 12.58-1.13 12.58-8.68s-7-8.49-12.89-8.49h-1.57Z"
        transform="translate(-4.44 -3.81)"
      />
    </G>
  </Svg>
);

export default WalkerLogoComponent;
