import { createStitches, CSS } from '@stitches/react';

import { colors, shadows, space, sizes, radii, media, fonts, fontSizes, lineHeights } from './foundations';

export const { styled, css, getCssText, theme, config, globalCss } = createStitches({
  media,
  theme: {
    colors,
    shadows,
    space,
    sizes,
    radii,
    fonts,
    fontSizes,
    lineHeights,
  },
})

export const globalStyles = globalCss({
  '*': {
    'box-sizing': 'border-box',
    'font-family': 'Inter',
  },

  'html, body, #__next': {
    width: '100vw',
    height: '100vh',
    margin: '0',
    padding: '0',
    overflow: 'auto',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
    'text-rendering': 'optimizeLegibility',
    '-ms-text-size-adjust': '100%',
    '-webkit-text-size-adjust': '100%',
    'color-scheme': 'dark',
  },

  '#__next': {
    width: '100vw',
    height: '100vh',
    overflow: 'auto',
  }
});

export type ThemeCSS = CSS<typeof config>