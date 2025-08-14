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

const withRootLayout: Decorator = (Story) => {
  const style: React.CSSProperties = {
    fontFamily: `var(${fontBody.variable})`,
  };

  // This is a workaround to apply the headline font variable globally for stories
  const fontStyles = `
    :root {
      --font-body: ${fontBody.style.fontFamily};
      --font-headline: ${fontHeadline.style.fontFamily};
    }
    body {
        font-family: var(--font-body);
    }
    h1, h2, h3, h4, h5, h6 {
        font-family: var(--font-headline);
    }
  `;

  return (
    <>
      <style>{fontStyles}</style>
      <div style={style}>
        <Story />
      </div>
    </>
  );
};


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
