# 进阶配置

## 优化产出代码
### CSS 抽离和压缩
```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserJSPlugin = require("terser-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

module.export = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 这里不使用 style-loader，而是抽离到其他地方
                    MiniCssExtractPlugin.loader,
                    // ...loaders
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // 抽离到 css 文件夹下
            filename: 'css/main.[contentHash:8].css'
        })
    ],
    optimization: {
        // 压缩 css，两个插件都需要安装
        minimizer: [
            new TerserJSPlugin({}),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
}
```

### png 图片压缩
```js
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.export = {
    plugins: [
        new ImageminPlugin({
            disable: isDev, 
            pngquant: { quality: '95-100' } // 图片质量
        })
    ]
}
```

### 公共代码抽离
`webpack` 总共提供了三种办法来实现 `Code Splitting`，如下：
- **入口配置**：`entry` 入口使用多个入口文件；
- **抽取公有代码**：使用 `SplitChunks` 抽取公有代码；
- **动态加载**：动态加载一些代码；
```js
splitChunks: {
    chunks: "all",
    cacheGroups: {
        vendors: {
            test: /[\\/]node_modules[\\/]/,  // 匹配node_modules目录下的文件
            priority: -10   // 优先级配置项
        },
        common: {
            minChunks: 2,
            priority: -20,   // 优先级配置项
            reuseExistingChunk: true
        }
    }
}
```

### Tree Shaking
1. `tree-shaking` 主要作用是清除代码中无用的部分；
2. 目前在 `webpack4` 中设置 `mode: production` 就自动开启了`tree-shaking`；
3. 但想使其生效，生成的代码必须是 ES Module，不能使用其它类型的模块；
4. 但是如果使用 `Babel` 的话，因为 `Babel` 的预案（preset）默认会将任何模块类型都转译成 `CommonJS` 类型，这会导致`tree-shaking` 失效；
5. 修正这个问题也很简单，在 `.babelrc` 文件中设置 `modules: false` 就好了；
```js
// .babelrc
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "modules": false 
            }
        ]
    ]
}
```

### Scope Hositing
1. 作用域提升；
2. 被引用一次的模块会被合并，不会造成代码冗余；
3. 因为需要分析模块间的依赖关系，源码必须采用 `ES6` 模块化，否则 `webpack` 会降级处理不采用 `Scope Hoisting`；
```js
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');

module.export = {
    resolve: {
        mainFields: ['jsnext:main', 'browser', 'main']
    },
    plugins: [
        new ModuleConcatenationPlugin()
    ]
}
```

### 路由 和 组件 懒加载 
如 `import(/* webpackChunkName: "home" */ '../pages/home')`

## 优化构建速度
### 缩小文件搜索范围
```js
module.exports = {
    module: {
        // 不去解析 jquery 中的依赖库
        noParse: /jquery/,
        rules: [
            // 充分利用 include 和 exclude
        ]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src')
        },
        extensions: ['*', 'js', 'json', 'vue']
    }
}
```

### HappyPack 开启多进程 loader 解析
> **HappyPack 的基本原理**：<br>
> 将 `loader` 解析转换各类文件的任务分解到多个子进程中并行处理，子进程处理完成后把结果发送到主进程，从而减少总的构建时间；
```js
// js 是单线程的，HappyPack 能帮助开启多进程
const HappyPack = require('happy-pack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['happypack/loader?id=happyBabel'],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HappyPack({
            // id 要与上边相对应
            id: 'happyBabel',
            loaders: ['babel-loader?cacheDirectory'],
            threadPool: happyThreadPool
        })
    ]
}
```

### webpack-parallel-uglify-plugin 优化代码压缩时间
注意事项：
- 项目较大，打包较慢，开启多进程能提高速度；
- 但是项目较小，却会降低速度，因为开启进程和进程通信的开销大；
```js
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

plugins: [
    new ParallelUglifyPlugin({
        // 还是使用 UglifyJS 压缩，只不过帮助开启多进程
        UglifyJS: {
            output: {
                beautify: false, // 紧凑输出，不需要美化
                comments: false // 删除注释
            },
            compress: {
                drop_console: true, // 删除 console
                collapse_vars: true, // 内嵌定义了但只使用一次的变量
                reduce_vars: true // 提取使用多次但没定义成变量的值
            }
        }
    })
]
```

### 抽离第三方模块
使用 `webpack` 内置的 `DllPlugin` 和 `DllReferencePlugin` 进行抽离；

### 配置缓存
- 例如通过设置 `babel-loader?cacheDirectory=true` 来开启缓存，将每次的编译结果写进硬盘文件；
- 如果 `loader` 不支持缓存，可以通过 `cache-loader`，将 `loader` 编译结果写入硬盘缓存；




