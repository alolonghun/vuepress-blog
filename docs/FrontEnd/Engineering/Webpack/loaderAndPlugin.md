# 编写 Loader 和 Plugin

## 编写 loader
原则：
- **单一原则**：每个 `Loader` 只做一件事；
- **链式调用**：`Webpack` 会按顺序链式调用每个 `Loader`；
- **统一原则**：遵循 `Webpack` 制定的设计规则和结构，输入与输出均为字符串，各个 `Loader` 完全独立，即插即用；

编写 Loader 如下：
> `@babel/parser` — 将源代码解析成 AST<br>
> `@babel/traverse` — 对AST节点进行递归遍历，生成一个便于操作、转换的path对象<br>
> `@babel/generator` — 将AST解码生成js代码<br>
> `@babel/types` — 通过该模块对具体的AST节点进行进行增、删、改、查<br>
```js
// drop-console.js
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const t = require('@babel/types')

module.exports = function(source) {
    const ast = parser.parse(source, { sourceType: 'module' })
    traverse(ast, {
        CallExpression(path) { 
            if (t.isMemberExpression(path.node.callee) && 
                t.isIdentifier(path.node.callee.object, { name: "console" })) {
                path.remove()
            }
        }
    })
    const output = generator(ast, {}, source);
    return output.code
}
```
自定义 Loader 的使用方法：
```js
module.exports = {
    module:{
        rules:[{
            test:/\.js$/,
            use:path.resolve(__dirname,'drop-console.js')
            }
        ]
    }
}
```

## 编写 Plugin
在 `Webpack` 运行的生命周期中会广播出许多事件，`Plugin` 可以监听这些事件，在合适的时机通过 `Webpack` 提供的 `API` 改变输出结果；

编写 Plugin 如下：
```js
class firstPlugin {
    constructor(options) {
        this.options = options
    }
    apply(compiler) {
        compiler.plugin('emit', (compilation, callback) => {
            let str = ''
            for (let filename in compilation.assets) {
                str += `文件: ${filename}, 大小:${compilation.assets[filename]['size']()}\n`
            }
            // 通过 compilation.assets 可以获取打包后静态资源信息，同样也可以写入资源
            compilation.assets['fileSize.md'] = {
                source() {
                    return str
                },
                size() {
                    return str.length
                }
            }
            callback()
        })
    }
}
module.exports = firstPlugin
```
自定义 Plugin 的使用方法：
```js
const ShowFileSize = require('webpack-fileSize.js')
module.exports = {
    plugins:[
        new ShowFileSize()
    ]
}
```

[compiler 钩子文档](https://www.webpackjs.com/api/compiler-hooks/)<br>
[compilation 钩子文档](https://www.webpackjs.com/api/compilation-hooks/)

