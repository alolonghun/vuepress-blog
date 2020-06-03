# 数组扁平化
#### 核心思想：
1. 遍历数组每一项；
2. 如果是数组，就调用扁平化函数对该项进行扁平化，并合并到临时数组中；
3. 如果不是数组，则直接合并到临时数组中；

### reduce + 递归
```js
function flatten(arr) {
    return arr.reduce((prev, cur) => {
        return prev.concat(Array.isArray(cur) ? flatten(cur) : cur);
    }, [])
}
```

### toString + split
> 这种方法算是一种黑魔法吧，只适用于 `数组中的元素类型都相同` 的情况；
```js
function flatten(arr) {
    return arr.toString().split(',').map(item => Number(item));
} 
```

### flat
> `ES10` 的 `API`，兼容性不好；
```js
function flatten(arr) {
    return arr.flat(Infinity); // 使用 Infinity 可以展开任意深度的嵌套数组
} 
```