module.exports = {
    // some configuration
    assetPrefix: process.env.NODE_ENV === 'production' ? 'https://mickey2012ex.github.io/TestNextDeploy/' : '',
    // another configuration
    webpack: (config) => {
        config.output.publicPath = `/TestNextDeploy${config.output.publicPath}`;
        return config;
    },
}