# debounce

## 应用场景
1. 搜索联想功能；
2. 输入框校验证；
3. 监听 `resize`，修改页面样式；

## 实现代码
```js
function debounce (fn, delay, immediate) {
    let timer = null;

    return function (...args) {
        if (immediate && !timer) {
            fn.apply(this, args);
        }
        if (timer) clearTimeout(timer);

        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    }
}
```