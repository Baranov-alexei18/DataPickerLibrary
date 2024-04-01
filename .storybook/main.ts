import type { StorybookConfig } from "@storybook/react-vite"

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  staticDirs: ['../public'],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions"
  ],
  typescript: {
    check: false,
    reactDocgen: 'react-docgen',
    reactDocgenTypescriptOptions: {},
    skipCompiler: true,
  },
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  docs: {
    autodocs: "tag"
  }
}
export default config
