import type { Preview, Decorator } from '@storybook/react';
import '@amberops/design-tokens/globals.css';
import { Inter, Space_Grotesk } from 'next/font/google';
import React from 'react';

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const fontHeadline = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-headline',
});

const withRootLayout: Decorator = (Story) => (
  <div className={`${fontBody.variable} ${fontHeadline.variable} font-body`}>
    <Story />
  </div>
);


const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withRootLayout],
};

export default preview;
