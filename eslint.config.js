import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:prettier/recommended',
    ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
      // 함수형 컴포넌트를 화살표 함수로 작성하도록 강제 (코딩 컨벤션)
      'react/function-component-definition': [
        2,
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],

      // 화살표 함수 본문 스타일 지정(간결한 함수 작성을 유도하여 코드의 가독성을 높일 수 있음)
      'arrow-body-style': ['error', 'as-needed'],

      // 컴포넌트 이름을 PascalCase로 강제(코딩 컨벤션)
      'react/jsx-pascal-case': 'error',

      // 변수/함수명은 camelCase로 강제(코딩 컨벤션)
      camelcase: ['error', { properties: 'never' }],

      // 이벤트 핸들러 prop 이름은 'on'으로 시작하도록 강제(코딩 컨벤션)
      'react/jsx-handler-names': [
        'error',
        {
          eventHandlerPropPrefix: 'on',
        },
      ],

      // Default Export와 Named Export 모두 허용(코딩 컨벤션)
      'import/no-default-export': 'off',
      'import/prefer-default-export': 'off',

      // 매직 넘버 사용 방지 (배열 인덱스 제외) -> 코드의 의미를 명확히 하고 유지보수성을 향상시킬 수 있음
      'no-magic-numbers': ['error', { ignoreArrayIndexes: true }],

      // React Hooks 규칙 강제(Hooks 관련 버그를 방지하고, Hooks의 올바른 사용을 유도)
      'react-hooks/rules-of-hooks': 'error',

      // PropTypes 사용 권장(타입 안정성을 향상시키고, 컴포넌트의 인터페이스를 명확히 할 수 있음)
      'react/prop-types': 'warn',

      // 재할당 없는 변수는 const 사용 강제
      'prefer-const': 'error',

      // var 대신 let과 const 사용 강제
      'no-var': 'error',

      // 사용하지 않는 변수 경고 (언더스코어로 시작하는 변수 제외)
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      // === 와 !== 사용 강제(타입 강제 변환으로 인한 예기치 않은 동작을 방지)
      eqeqeq: 'error',

      // console.log() 사용 시 경고 (warn과 error는 허용)
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // 객체 구조 분해 할당 권장(코드를 더 간결하고 읽기 쉽게 만들며, 필요한 속성만 명시적으로 사용할 수 있게 할 수 있음)
      'prefer-destructuring': [
        'error',
        {
          array: false,
          object: true,
        },
      ],

      // import 문 정렬(일관된 import 순서를 유지하여 코드의 구조를 파악하기 쉽게 만들어 줌)
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        },
      ],

      // JSX에서 중복된 props 방지(실수로 같은 prop을 여러 번 사용하는 것을 방지하여 버그를 예방)
      'react/jsx-no-duplicate-props': ['error', { ignoreCase: true }],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  }
);
