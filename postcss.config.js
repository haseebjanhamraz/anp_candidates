// postcss.config.js
module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      // Add PurgeCSS only in production
      ...(process.env.NODE_ENV === 'production'
        ? {
            '@fullhuman/postcss-purgecss': {
              content: ['./src/**/*.html', './src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'],
              defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
            },
          }
        : {}),
    },
  };
  