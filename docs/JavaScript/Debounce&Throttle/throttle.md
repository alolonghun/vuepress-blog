## 应用场景
1. resize
2. scroll
3. DOM 拖拽

## 实现代码
```js
function throttle(fn, timeout) {
    let last = 0;

    return function () {
        let now = + new Date()
        if (now - last > timeout || !last) {
            fn();
            last = now;
        }
    }
}
```