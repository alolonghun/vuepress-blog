# 基础配置

## 多入口打包
```js
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        pageOne: path.resolve(__dirname, '../src/pageOne.js'),
        pageTwo: path.resolve(__dirname, '../src/pageTwo.js')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/pageOne.html'),
            filename: 'pageOne.html',
            chunks: ['pageOne']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/pageTwo.html'),
            filename: 'pageTwo.html',
            chunks: ['pageTwo']
        }),

        // 当然，如果 输出的html文件名 与 入口js命名 是相同的，可以使用以下方法：
        // 另外，html 模板只有一个也是可以的，最终都会打包出多个 html；
        ...['pageOne', 'pageTwo'].map(name => {
            return new HtmlWebpackPlugin({
                template: path.resolve(__dirname, `../public/${name}.html`),
                filename: `${name}.html`,
                chunks: [name]
            })
        })
    ]
}
```

## css 浏览器兼容性
```shell
npm i postcss-loader autoprefixer -D
```
```js
// webpack loader
{
    test: /\.css$/,
    use: [
        // ...loaders
        {
            loader: 'postcss-loader',
            options: {
                // ！！！另一种方式：
                // 这里的配置也可以写在 postcss.config.js 中，然后导出
                plugins: [
                    require('autoprefixer')({
                        // 由于 postcss 版本更新，
                        // "browserslist" 字段名已改为 "overrideBrowserslist"
                        "overrideBrowserslist": ["> 1%", "not ie <= 8"]
                    })
                ]
            }
        }
        
    ]
}
```

## 图片、字体、媒体文件打包
```js
// 以图片举例，字体、媒体文件类似，不再赘述
{
    test: /\.(jpe?g|png|gif)$/i,
    use: [
        {
            loader: 'url-loader',
            options: {
                // 小于 5kb 的图片，会自动生成 base64
                limit: 1024 * 5,
                fallback: {
                    // v4.3.0 后默认使用 ES Module 语法
                    // 使用 CommonJS 引入图片会报错
                    loader: 'file-loader',
                    options: {
                        name: 'img/[name].[hash:8].[ext]',
                        // 关闭默认使用 ES Module 语法
                        // 使用 CommonJS 引入图片就不会报错
                        // ！！！另一种做法是：require('xxx.png').default
                        esModule: false
                    }
                }
            }
        }
    ]
}
```

## babel 转译 JS 文件
```shell
npm i -D babel-loader @babel/preset-env @babel/core

# 如果使用 @babel/polyfill
npm i -S @babel/polyfill 

# 如果使用 @babel/runtime
npm i -S @babel/runtime
npm i -D @babel/runtime-corejs3 @babel/plugin-transform-runtime
```
使用 `@babel/polyfill` 配置如下：
```js
// 想要全局引入 @babel/polyfill，可以直接在 入口文件中引入 或者 entry: ['@babel/polyfill', ...entries]
{
    test: /\.js$/,
    exclude: /node_modules/,
    use: [
        {
            loader: 'babel-loader',
            options: {
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            useBuiltIns: "usage", // 按需引入
                            corejs: 2 // 使用 polyfill，最高支持 corejs v2 版本
                        }
                    ]
                ]
            }
        }
    ]
}
```
使用 `@babel/runtime` 配置如下：
```js
{
    test: /\.js$/,
    exclude: /node_modules/,
    use: [
        {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: [
                    [
                        "@babel/plugin-transform-runtime", 
                        {
                            "corejs": 3
                        }
                    ]
                ]
            }
        }
    ]
}
```
### @babel/polyfill 和 @babel/runtime 对比：
- `@babel/polyfill` 是在原有 `JS` 内置对象及方法上做向后兼容的处理，比如说 `ES5` 里面的 `Object` 是没有自带 `assign` 方法的，那么加载了 `babel-polyfill` 之后，它就给 `Object` 扩展了一个 `assign` 方法，这样我们就可以直接使用 `Object.assign(obj1, obj2)` 了；
- `@babel/runtime` 的方式需要 `babel` 作为工具，在转换的过程中，检测到使用了 `Object.assign`，而且 `.babelrc` 配置中需要对其做ES5兼容处理，那么结合 `@babel/plugin-transform-runtime`，在该JS文件中引入 `Object.assign` 的`Polyfill`，这样也能实现 `Object.assign` 的功能，但是我们无法在 `Object` 上直接找到 `assign` 的方法;

#### @babel/polyfill 优缺点
缺点：
1. `@babel/polyfill` 可能会增加很多根本没有用到的 `polyfill`；
2. 可能会污染子模块的局部作用域，严重的可能会导致冲突；

#### @babel/runtime 优缺点
优点：
1. 不会污染全局变量；
2. 多次使用只会打包一次；
3. 依赖统一按需引入，无重复引入；
4. 避免 `babel` 编译的工具函数在每个模块里重复出现，减小库和工具包的体积；

缺点：
不支持实例化的方法，如 `Array.includes(x)` 就不能转化；
