module.exports = {
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: [
          'database',
          'dao',
          'handler',
          'helper',
          'middleware',
          'models',
          'modules',
          'plugins',
          'routes',
          'view',
          'constant',
          'cron',
          'query-builder',
          'node_modules'
        ],
        paths: ['./src']
      }
    },
    node: {
      allowModules: [
        'database',
        'dao',
        'handler',
        'helper',
        'middleware',
        'models',
        'modules',
        'plugins',
        'routes',
        'view',
        'constant',
        'cron',
        'query-builder'
      ],
      resolvePaths: ['src'],
      tryExtensions: ['.js', '.json', '.node']
    }
  },
  extends: [
    'standard',
    'prettier',
    'plugin:node/recommended',
    'plugin:security/recommended'
  ],
  plugins: ['jest', 'import', 'security'],
  rules: {
    curly: 2,
    'brace-style': 'error',
    'import/no-cycle': ['error', { commonjs: true }],
    'import/no-unresolved': ['error', { commonjs: true, caseSensitive: true }],
    'import/no-absolute-path': 'error',
    'import/no-extraneous-dependencies': 'error',
    'space-before-function-paren': 0,
    'no-var': 'error',
    'prefer-const': 'warn',
    'import/first': 'warn',
    'no-useless-concat': 'warn'
  },
  env: {
    jest: true,
    node: true
  }
};
