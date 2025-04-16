module.exports = function(api) {
  api.cache(true);
  
  // Define plugins based on environment
  const plugins = [];
  
  // Only add these plugins in production mode
  if (process.env.NODE_ENV === 'production') {
    plugins.push('transform-remove-console');
    plugins.push(['transform-react-remove-prop-types', {
      removeImport: true,
      ignoreFilenames: ['node_modules']
    }]);
  }
  
  return {
    presets: ['babel-preset-expo'],
    plugins: plugins
  };
};