const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

// 기본 설정을 가져옵니다.
const defaultConfig = getDefaultConfig(__dirname);
const {
  resolver: {assetExts, sourceExts},
} = defaultConfig;

// 폴리필을 포함한 커스텀 설정입니다.
const customConfig = {
  resolver: {
    // 필요한 폴리필 모듈을 명시합니다.
    extraNodeModules: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('readable-stream'),
      zlib: require.resolve('browserify-zlib'),
      path: require.resolve('path-browserify'),
      url: require.resolve('react-native-url-polyfill'),
    },
    // 애플리케이션에 사용되는 추가적인 정적 파일 확장자를 정의합니다.
    assetExts: [...assetExts, 'svg', 'png', 'bin', 'db', 'onnx', 'ort', 'gif'],
    // 소스 코드 파일의 확장자를 정의합니다.
    sourceExts: [...sourceExts, 'json', 'jsx', 'tsx', 'ts'],
  },
  watchFolders: [path.resolve(__dirname, '../')],
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};

// 기본 설정과 커스텀 설정을 합칩니다.
module.exports = mergeConfig(defaultConfig, customConfig);
