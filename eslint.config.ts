import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import pluginOxlint from 'eslint-plugin-oxlint'
import boundaries from 'eslint-plugin-boundaries'
import skipFormatting from 'eslint-config-prettier/flat'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,ts,mts,tsx}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  ...pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),

  {
    name: 'app/fsd-boundaries',
    plugins: { boundaries },
    settings: {
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app', partialMatch: false },
        { type: 'pages', pattern: 'src/pages/*', partialMatch: false, capture: ['slice'] },
        { type: 'widgets', pattern: 'src/widgets/*', partialMatch: false, capture: ['slice'] },
        { type: 'features', pattern: 'src/features/*', partialMatch: false, capture: ['slice'] },
        { type: 'entities', pattern: 'src/entities/*', partialMatch: false, capture: ['slice'] },
        { type: 'shared', pattern: 'src/shared', partialMatch: false },
      ],
    },
    rules: {
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          checkAllOrigins: true,
          policies: [
            { allow: { to: { module: { origin: 'external' } } } },
            { from: { element: { type: 'app' } }, allow: { to: { element: { types: { anyOf: ['app', 'pages', 'widgets', 'features', 'entities', 'shared'] } }, file: { path: '**/index.ts' } } } },
            { from: { element: { type: 'pages' } }, allow: { to: { element: { types: { anyOf: ['widgets', 'features', 'entities', 'shared'] } }, file: { path: '**/index.ts' } } } },
            { from: { element: { type: 'widgets' } }, allow: { to: { element: { types: { anyOf: ['features', 'entities', 'shared'] } }, file: { path: '**/index.ts' } } } },
            { from: { element: { type: 'features' } }, allow: { to: { element: { types: { anyOf: ['entities', 'shared'] } }, file: { path: '**/index.ts' } } } },
            { from: { element: { type: 'entities' } }, allow: { to: { element: { type: 'shared' }, file: { path: '**/index.ts' } } } },
          ],
        },
      ],
    },
  },

  skipFormatting,
)
