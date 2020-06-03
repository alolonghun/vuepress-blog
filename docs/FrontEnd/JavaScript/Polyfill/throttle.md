# throttle

## 应用场景
1. 限制点击事件的触发频率；
2. 屏幕滚动到底部加载更多的功能；

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