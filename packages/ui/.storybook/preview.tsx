import type { Preview, Decorator } from '@storybook/react';
import '@amberops/design-tokens/globals.css';
import React from 'react';

const withRootLayout: Decorator = (Story) => {
  const style: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    '--font-body': 'Inter, sans-serif',
    '--font-headline': "'Space Grotesk', sans-serif",
  };

  return (
    <div style={style}>
      <Story />
    </div>
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
