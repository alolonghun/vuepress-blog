# new

#### 实现思路：
1. 创建一个对象，其 `__proto__` 指向构造函数的原型；
2. 将新创建的对象作为 `this` 上下文，执行构造函数；
3. 若执行结果是对象，则返回该对象；若执行结果不是对象，则返回初始创建的对象；

```js
const newPolyfill = (fn, ...rest) {
    const instance = Object.create(fn.prototype);
    const res = fn.apply(instance, rest);
    const resType = typeof res;
    
    return (resType === 'object' || resType === 'function') && res !== null ? res : instance;
}
```