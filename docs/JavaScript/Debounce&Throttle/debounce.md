## 应用场景
1. 搜索
2. 表单提交

## 实现代码
```js
function debounce (fn, wait, immediate) {
    let timer = null;

    return function (...args) {
        if (immediate && !timer) {
            fn.apply(this, args);
        }
        if (timer) clearTimeout(timer);

        timer = setTimeout(() => {
            fn.apply(this, args);
        }, wait);
    }
}
```