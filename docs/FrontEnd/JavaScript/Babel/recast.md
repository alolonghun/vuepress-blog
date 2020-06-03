# recast

### 什么是 recast？
如上节所说，我们已经知道了 `AST` 相关的知识；<br>
现在我们想找一个比较合适的工具，能把我们的代码转换成 `AST`，那么该利用什么工具呢？<br> 
答案是 `recast`，它对 `@babel/core`、`@babel/parser`、`@babel/types` 等包进行了封装，使用起来非常方便；

### recast 安装和引入
#### 安装 recast
```shell
npm i recast
```

#### 引入 recast
```js
// CommonJS
const recast = require('recast')

// ES Module
import * as recast from 'recast'
```

### recast 基本使用
下边主要按照 `recast` 官方的例子进行演示；

#### recast.parse
`parse` 就像一把螺丝刀，它可以将代码解析成 `AST` 树；
```js
// parse.js
const recast = require('recast')
const code = `function add(a, b) {
    return a + b
}`

const ast = recast.parse(code)
// 由于这里只定义了一个函数，所以直接取 body 数组中的第一个元素 - add 函数
const add = ast.program.body[0]
console.log(add)
```

执行 `node parse.js` 命令，打印结果如下：
```js
FunctionDeclaration {
    type: 'FunctionDeclaration',
    id: Identifier...,
    params: [Identifier...],
    body: BlockStatement...
}
```
#### recast.print
`print` 就像粘合剂，它可以将 `AST` 树组装成能够执行的代码；
```js
// print.js
const recast = require('recast')
const code = `function add(a, b) {
    return a + b
}`

const ast = recast.parse(code)
const output = recast.print(ast).code;
console.log(output)
```
执行 `node print.js` 命令，打印结果如下：
```js
function add(a, b) {
    return a + b
}
```

#### recast.prettyPrint
`prettyPrint` 就像个美工，它可以将 `AST` 树转成可执行的代码，并且进行指定格式化；
```js
// prettyPrint.js
const recast = require('recast')
// 这里写成一行
const code = `function add(a, b) { return a + b }`

const ast = recast.parse(code)
const output = recast.prettyPrint(ast, { tabWidth: 4 }).code;
console.log(output)
```
执行 `node prettyPrint.js` 命令，打印结果如下：
```js
function add(a, b) {
    return a + b
}
```
具体配置可见：[prettyPrint](https://github.com/benjamn/recast/blob/master/lib/options.ts)

#### recast.types.builders
`recast.parse` 提供了 `Code -> AST` 的能力，`recast.print` 则提供了 `AST -> Code` 的能力；<br>
那么如果我们想修改 `AST`，再把修改后的 `AST` 输出为可运行的代码，该怎么实现呢？<br>
答案是 `recast.types.builders`，它提供了多种 [Parser API](https://developer.mozilla.org/zh-CN/docs/Mozilla/Projects/SpiderMonkey/Parser_API)，我们得以方便得对 `AST` 进行修改；<br>

下面我们来实现一个简单的功能，将 demo 中的 `函数声明` 转换为 `函数表达式`，即：<br>
`function add(a, b) { return a + b }` => `const add = function(a, b) { return a + b }`<br>

示例代码如下：
```js
// builders.js
const recast = require('recast')
const { 
    variableDeclaration,
    variableDeclarator, 
    functionExpression 
} = recast.types.builders

const code = `function add(a, b) {
  return a + b
}`
const ast = recast.parse(code)
const add = ast.program.body[0]

// variableDeclaration - 创建一个变量声明
ast.program.body[0] = variableDeclaration('const', [
    // variableDeclarator - 创建一个变量说明符（这里是 "add"）
    // functionExpression - 创建一个函数表达式
    variableDeclarator(add.id, functionExpression(
        null, // 函数表达式名（null 代表匿名函数表达式）
        add.params,
        add.body
    ))
])

const output = recast.print(ast).code

console.log(output)
```
执行 `node builders.js` 命令，打印结果如下：
```js
const add = function(a, b) {
    return a + b
}
```

#### recast.run
上边的代码演示，完成了 `Source Code -> AST -> Modified AST -> Modified AST` 的一系列过程；<br>
但有个问题，我们所有的演示都是集中在某个文件，日常开发中肯定不希望 `JS脚本` 和 `源码` 放一块；<br>
所以这个时候，我们就用到了 `recast.run`，它可以让我们肆无忌惮得对源码文件输出；<br>

还是用 `recast.types.builders` 的例子，只需要改造一下代码：
```js
// read.js
const recast = require('recast')
const { 
    variableDeclaration,
    variableDeclarator, 
    functionExpression 
} = recast.types.builders

recast.run((ast, printSource) => {
    const add = ast.program.body[0]

    ast.program.body[0] = variableDeclaration('const', [
        variableDeclarator(add.id, functionExpression(
            null,
            add.params,
            add.body
        ))
    ])

    const output = recast.print(ast).code
    printSource(output)
})
```

```js
// source.js
function add(a, b) {
  return a + b
}
```
最后我们执行 `node read.js source.js` 命令，打印结果如下：
```js
const add = function(a, b) {
    return a + b
}
```

#### recast.visit
`visit` 能够遍历 `AST` 节点，它可以遍历出的类型与 `recast.types.builders` 中的能构造出来的类型是一致的；<br>

示例代码如下：
```js
recast.run((ast, printSource) => {
    recast.visit(ast, {
        // 遍历箭头函数（形式如 visitXXX 就是遍历某个类型）
        visitArrowFunctionExpression (path) {
            printSource(path.node) // 遍历出的箭头函数

            // 每个 visit 必须加上 return false，否则会报错
            return false 
        }
    })
})
```

#### recast.types.namedTypes
这个 `API` 可以用来判断 `AST` 对象是否为指定类型，`namedTypes` 中有以下两个方法：
- **namedTypes.Node.assert**：当类型不配置的时候，直接报错退出；
- **namedTypes.Node.check**：判断类型是否一致，并输出 `true` 或 `false`；

示例代码如下：
```js
// namedTypes.js
const recast = require('recast')
const t = recast.types.namedTypes

const arrowNoop = () => {}
const ast = recast.parse(arrowNoop)

recast.visit(ast, {
    visitArrowFunctionExpression ({ node }) {
        console.log(t.ArrowFunctionExpression.check(node))
        return false
    }
})
```
执行 `node namedTypes.js`，能看出打印台输出结果为 `true`。
