## 模拟 call 函数

**要点：**
1. 判断 `this` 是否指向函数，若不是，则抛出错误;
2. context 若传 `undefined` 或 `null`，则默认为 `window` 对象;
3. 为 `context` 创建一个 `fn` 属性 (实际上是一个 `Symbol`，为了防止重名)，将当前函数赋值给它;
4. 将剩余参数传给 `context[fn]` 函数运行，并赋值给 `result`;
5. 删除 `context` 的 `fn` 属性 (若不删除，`context` 对象上会多一个 `fn` 属性)，并返回 `result`；

```js
Function.prototype.myCall = function (context, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError('Error');
    }

    context = context || window;
    const fn = Symbol();
    context[fn] = this;
    const result = context[fn](...args);
    delete context[fn];
    return result;
}
```

## 模拟 apply 函数

**要点：**
`apply` 函数实现方法与 `call` 类似，唯一不同的是参数为数组

```js
Function.prototype.my = function (context, args) {
    if (typeof this !== 'function') {
        throw new TypeError('Error');
    }

    context = context || window;
    const fn = Symbol();
    context[fn] = this;
    let result;
    if (Array.isArray(args)) {
        result = context[fn](...args);
    } else {
        result = context[fn]();
    }
    delete context[fn];
    return result;
}
```

## 模拟 bind 函数

**要点：**
1. 处理参数，返回一个闭包
2. 判断是否为构造函数调用，是则使用 `new` 调用当前函数
3. 如果不是，使用 `apply`，将 `context` 和处理好的参数传入

```js
Function.prototype.myBind = function (context,...args1) {
    if (this === Function.prototype) {
        throw new TypeError('Error')
    }
    const _this = this
    return function F(...args2) {
        if (this instanceof F) {
            return new _this(...args1, ...args2)
        }
        return _this.apply(context, args1.concat(args2))
    }
}
```