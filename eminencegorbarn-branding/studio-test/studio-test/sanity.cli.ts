import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'uz3il453',
    dataset: 'production'
  },
  deployment: {
    appId: 'ieeojye9ed3y71zb9nx77caz',
    autoUpdates: true,
  },
  vite: (config) => {
    return {
      ...config,
      css: {
        ...config.css,
        postcss: {},
      }
    }
  }
})
