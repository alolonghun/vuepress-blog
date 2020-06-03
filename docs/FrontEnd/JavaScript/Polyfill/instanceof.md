# instanceof

#### 实现思路
1. 查找 `right.prototype` 所指向的对象是否在 `left` 的原型链上；
2. 如果有则返回 `true`，否则返回 `false`；

```js
const instanceofPolyfill = function(left, right) {
    let proto = Object.getPrototypeOf(left);

    while (true) {
        if (left == null) return false;
        if (proto === right.prototype) return true;

        proto = Object.getPrototypeOf(proto)
    }
}
```