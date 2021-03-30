const withImages = require('next-images');

module.exports = withImages({
  esModule: true,
});

module.exports = {
  future: {
    webpack5: true,
  },
  images: {
    domains: ['restcountries.eu'],
  },
};
