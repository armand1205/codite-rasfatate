export default {
    preprocessors: ['tokens-studio'],
    log: {
        warnings: 'warn',
        errors: { brokenReferences: 'warn' },
    },
    source: ['assets/tokens/tokens.json'],
    platforms: {
        css: {
            transformGroup: 'tokens-studio',
            transforms: ['name/kebab'],
            buildPath: 'assets/css/base/',
            files: [
                {
                    destination: 'variables.css',
                    format: 'css/variables',
                    options: { outputReferences: true },
                },
            ],
        },
    },
};
