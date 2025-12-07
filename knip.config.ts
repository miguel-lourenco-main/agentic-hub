import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  // TypeScript path aliases to help knip resolve imports
  paths: {
    '@/*': ['./*'],
    '@/components/*': ['components/*'],
    '@/lib/*': ['lib/*'],
    '@/hooks/*': ['hooks/*'],
    '@/app/*': ['app/*'],
  },
  ignore: [
    '.next/**',
    'node_modules/**',
    'dist/**',
    'build/**',
    '**/*.d.ts',
    'next-env.d.ts',
    'tsconfig.tsbuildinfo',
  ],
  ignoreDependencies: [
    // Next.js internal dependencies
    'eslint-config-next',
  ],
};

export default config;
