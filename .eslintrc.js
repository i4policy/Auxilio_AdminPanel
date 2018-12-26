module.exports = {
  root: true,

  env: {
    node: true
  },

  rules: {
    'comma-dangle': 'off',
    'arrow-parens': 'off',
    'key-spacing': 'off',
    'object-curly-newline': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  extends: ['plugin:vue/strongly-recommended', '@vue/prettier', '@vue/airbnb']
};
