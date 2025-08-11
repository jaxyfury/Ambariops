
import type { Preview } from "@storybook/react";
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

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className={`${fontBody.variable} ${fontHeadline.variable} font-body`}>
        <Story />
      </div>
    ),
  ]
};

export default preview;
