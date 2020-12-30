module.exports = {
  alias: {
    '@components': './src/components',
    '@pages': './src/pages',
  },
  mount: { src: '/dist', public: '/' },
  plugins: [
    '@snowpack/plugin-postcss',
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-typescript',
  ],
  experiments: {
    optimize: {
      bundle: true,
      minify: true,
      target: 'es2017',
    },
  },
};
