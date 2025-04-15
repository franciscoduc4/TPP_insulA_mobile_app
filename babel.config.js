module.exports = function(api) {
  api.cache(true);
  
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            // Any module aliases can be defined here
          },
        },
      ],
    ],
  };
};