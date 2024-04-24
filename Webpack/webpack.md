# Webpack and Babel

Webpack is a module bundler that allows you to bundle and optimize your web application's assets, including JavaScript, CSS, and images. It operates on a configuration file where you define various settings, plugins, and loaders to control the bundling process. 

## 1. Entry

starting point for building the dependency graph. 

```javascript
module.exports = {
  entry: './src/index.js',
};
```

## 2. Output

```javascript
const path = require('path');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};
```

## 3. Loaders

Loaders allow you to preprocess files before they are added to the bundle.
2 args need to be passed  
1. test - which files should be transformed
2. use - which loader to use

```javascript
// using bable-loader to transplie javascript
// npm i babel-loader --save
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
```

another example using css-loader-  

css-loader is used to bundle css files and include then in js files using @import statements 

```javascript
// npm install --save-dev css-loader ts-loader
//similarly ts-loader us used to convert ts code to js
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' }
    ]
  }
};
```

## 4. Plugins

Plugins perform a wide range of tasks such as bundle optimization, asset management, and environment-specific configurations.

```javascript
// helps in minifying html files for prod
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
```

## 5. Tree shaking

Tree shaking is a technique that eliminates dead code from your final bundle. It removes unused exports, reducing the bundle size.


# Babel

used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript.  

```javascript
// Babel Input: ES2015 arrow function
[1, 2, 3].map(n => n + 1);

// Babel Output: ES5 equivalent
[1, 2, 3].map(function(n) {
  return n + 1;
});
```

### 3 steps to use babel

1. Install babel ```npm install --save-dev @babel/core @babel/cli @babel/preset-env```
2. babel.config.json  

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        "useBuiltIns": "usage",
        "corejs": "3.6.5"
      }
    ]
  ]
}
```

3. ```./node_modules/.bin/babel src --out-dir lib```