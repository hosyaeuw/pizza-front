const {
    override,
    addWebpackModuleRule,
    addWebpackPlugin,
} = require('customize-cra');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const bundleAnalyzer = !process.env.CI_COMMIT_SHA
    ? addWebpackPlugin(new BundleAnalyzerPlugin())
    : undefined;

module.exports = override(
    addWebpackModuleRule({
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
            {
                loader: '@svgr/webpack',
                options: {
                    icon: true,
                },
            },
        ],
    }),
    // bundleAnalyzer,
);
