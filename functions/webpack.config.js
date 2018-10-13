const glob = require("glob");
const path = require("path");
const webpack = require("webpack");
const uglifyJSPlugin = require("uglifyjs-webpack-plugin");
const copyWebpackPlugin = require("copy-webpack-plugin");
const dotenvPlugin = require("dotenv-webpack");

const OUTPUT_DIR = path.resolve(__dirname, "build");

let funcMap = glob.sync("./src/api/**/*.func.ts").reduce((map, path) => {
    const exp = /\/src\/api\/([0-9A-Za-z_-]+\/?)+\/\1.func.ts/g;
    const name = exp.exec(path)[1];
    map[name] = path;
    return map;
}, {});

module.exports = {
    target: "node",
    resolve: {
        extensions: [".ts", ".js", ".json"],
        modules: ["node_modules", "src"],
        alias: {
            '@': path.resolve(__dirname, 'src/'),
            'node-fetch$': "node-fetch/lib/index.js"
        }
    },
    devtool: "source-map",
    externals: ["pg", "sqlite3", "pg-hstore", "mysql2"],
    entry: funcMap,
    output: {
        path: OUTPUT_DIR,
        filename: "[name]/[name].js",
        libraryTarget: "commonjs2"
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: [/\.(spec|e2e)\.ts$/]
            }
        ]
    },
    plugins: [
        new dotenvPlugin(),
        new copyWebpackPlugin([
            {
                from: "src/host.json",
                to: "host.json"
            },
            {
                from: "src/local.settings.json",
                to: "local.settings.json"
            },
            {
                context: "src/api",
                from: "**/function.json",
                test: /([0-9A-Za-z_-]+\/?)+\/function.json/,
                toType: "template",
                to: "[1]/function.json"
            }
        ]),
        new webpack.ContextReplacementPlugin(/Sequelize(\\|\/)/, path.resolve(__dirname, "./src"))
    ]
};
