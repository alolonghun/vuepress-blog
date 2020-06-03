# 函数式编程

## 特点
- **函数是一等公民**：跟其它数据类型一样，可以赋值给其他变量，可以当作参数传递给另一个函数，也可以作为另一个函数的返回值；
- **函数是纯函数**：同输入同输出，且无副作用；

## 函数式编程基本运算
### 函数合成
**特点**：利于代码重用
```js
function compose(...fnArgs) {
    let start = fnArgs.length - 1;
    return function(...args) {
        let i = start - 1;
        let result = args[start].apply(this, args);
        while (i >= 0) {
            result = args[i].call(this, result);
            i --;
        }
        return result;
    }
}
```

### 函数柯里化
```js
function curry(fn, ...arrArgs) {
    let length = fn.length;
    let params = arrArgs || [];
    return function(...args) {
        params = params.concat(args);
        
        if (params.length < length) {
            return curry(fn, ...params);
        }
        return fn.apply(this, params);
    }
}
```