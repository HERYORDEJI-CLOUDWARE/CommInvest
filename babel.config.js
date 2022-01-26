// module.exports = function(api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo']
//   };
// };

module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.tsx', '.ts', '.js', 'jsx', '.json'],
        },
      ],
      'react-native-reanimated/plugin',
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
  };
};
