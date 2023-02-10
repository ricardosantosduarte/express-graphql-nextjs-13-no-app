import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: './server/graphql/schema.js',
    generates: {
        './src/types/index.ts': {
            plugins: ['typescript'],
            config: {
                avoidOptionals: true,
                numericEnums: true,
            },
        },
    },
};
export default config;
