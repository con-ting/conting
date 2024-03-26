module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    //eslint 규칙 off 하여 warning(노란줄) 삭제
    'react/react-in-jsx-scope': 'off',

    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
