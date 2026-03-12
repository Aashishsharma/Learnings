# Webpack and Babel

Webpack is a module bundler that allows you to bundle and optimize your web application's assets, including JavaScript, CSS, and images. 

### What can webpack do?
1. load assets
2. optimize prod build
3. bundle splitting
4. Hot Module replacement (HMR)
5. Dead code elimination (Tree shaking)
6. Caching


### Key concepts
1. Entry / output
2. loaders
3. Plugins

**need to create webpack.config.js file**  
**need to install 2 packages - webpack and webpack-cli**
**then run command webpack - it will find webpack.config.js file and do the rest**


**webpack runs in 2 modes - prod and dev** - in prod mode, js files are minified, but not in dev mode, so in dev mode, debugging is eaier, but bundle file size is large  

**webpack sets this env based on webpack is run on dev or prod mode - ```process.env.NODE_ENV = "development"```**

Hence in apps, we use this condition many times - if process.env.NODE_ENV === '', now you know from where this env is set - **webpack does this**

## 1. Entry
starting point for building the dependency graph. 
From this file webpack recursively travers all the imported files and create dep graph.  

But what if we have 10 different pages in app, and few of them are not imported by main entry / index.js or from it's transitive deps? - **use multiple entry points** 
```javascript
module.exports = {
  entry: './src/index.js',
  // entry can be string, array of files or obj
  // below will create 2 separate bundles for app and admin
  entry: {
    app: "./src/app.js",
    admin: "./src/admin.js"
  }
  // but then if we have 2 entry points, and give only one output file name webpack will complain
  // so output should be
  output: {
  filename: "[name].bundle.js" // [name is place holder for each field in entry obj]
  // instead of name, we and use [contenthash].bundle.js
}
};
```
## 2. Output

```javascript
const path = require('path');
// The webpack.config.js file is run in node env
// so all inbuilt node modules like path, are available
module.exports = {
  // output obj requires 2 fields
  output: {
    // __dirname - coming from node.js
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};
```

## 3. Loaders
- By default webpack only understand js files and how to bundle them
- if we want to bundle css, images, fonts, then we need to add respective loaders in webpack
- so these loaders will allow bundling of respective files
- loader also transplies the code - so ES6 code to plain JS, sass to css

Loaders allow you to preprocess files before they are added to the bundle.
2 args need to be passed  
1. test - which files should be transformed
2. use - which loader to use

```javascript
// using bable-loader to transplie javascript
// npm i babel-loader --save
module.exports = {
  module: { // loaders go inside module obj
    rules: [
      // inbuild webpack loaders
      // 1. for imgs
      {
        test: /\.jpeg|png$/,
        type: 'asset/resource' // this is default loader provided by webpack to load assets like imgs
      },
      // 2. for fonts - need to use same asset/resource loader
      {
        test: /\.ttf|woff$/,
        type: 'asset/resource' 
      },
      // for 3rd party loaders, we need to use the use field as shown below
      // we also frst need to install these 3 part loaders
      // 3. for css
      {
        test: /\.css$/
        use: ['style-loader', 'css-loader']
      },
      // 4. for scss
      {
        test: /\.scss$/
        use: ['style-loader', 'css-loader', 'sass-loader']
        // 3 order of exec is imp of these loaders (Right to Left)
        // frst - sass-loader is run, which converts scss to css
        // then css-loader is run - which allows import statemnts of css
        // then style-loader is run - which injects styles into DOM
      },
      {
        
        use: {
          loader: 'babel-loader',
        },
      },
      {},
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