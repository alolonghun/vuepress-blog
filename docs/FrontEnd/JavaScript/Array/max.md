# 数组最值

### reduce
```js
function max(arr) {
    return arr.reduce((prev, cur) => Math.max(prev, cur));
}
```

### Math.max
```js
function max(arr) {
    return Math.max.apply(null, arr);
}
```