import React from 'react'
import { GlobalStyles, theme } from 'twin.macro'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
// import { DEFAULT_VIEWPORT } from '@storybook/addon-viewport'

// Gatsby Setup
// ============================================
// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
};
// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = '';
// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = (pathname) => {
  action('NavigateTo:')(pathname);
};

const cache = createCache({ prepend: true, key: 'twin' })

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  // layout: 'centered',
  controls: { expanded: true },
  options: {
    storySort: (a, b) => {
      // We want the Welcome story at the top
      if (b[1].kind === 'Welcome') {
        return 1
      }

      // Sort the other stories by ID
      // https://github.com/storybookjs/storybook/issues/548#issuecomment-530305279
      return a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, { numeric: true })
    },
  }
}

export const decorators = [
  Story => (
    <CacheProvider value={cache}>
      <GlobalStyles />
      <Story />
    </CacheProvider>
  ),
]
