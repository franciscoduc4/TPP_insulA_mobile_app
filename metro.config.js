const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Exclude large development-only files from the bundle
config.resolver.blockList = [
  /.*\/__tests__\/.*/,
  /.*\/node_modules\/.*\/node_modules\/lodash.*/,
  /.test.js$/,
  /.spec.js$/,
];

// Enable bundle compression
config.transformer.minifierConfig = {
  compress: {
    // Remove console statements in production
    drop_console: true,
    // Extract and inline frequently used functions
    passes: 2,
  },
  mangle: {
    // Enhanced name mangling for smaller output
    toplevel: true,
  },
};

module.exports = config;