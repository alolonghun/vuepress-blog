# 数组去重
下边的方法比较具有代表性，当然还有很多其他的方法，但是都大同小异，主要是掌握核心思想；

### 使用双重 for 循环
```js
function unique(arr) {
    const temp = [];

    for (let i = 0; i < arr.length; i ++) {
        for (let j = 0; j < temp.length; j ++) {
            if (arr[i] === temp[j]) {
                break;
            }
        }
        if (j === temp.length) {
            temp.push(arr[i]);
        }
    }
    return temp;
}
```

### 使用 reduce + includes/indexOf
```js
function unique(arr) {
    return arr.reduce((prev, cur) => {
        return prev.includes(cur) ? prev : [...prev, cur];
    }, [])
}
```

### 使用 Set/Map 的特性
```js
function unique(arr) {
    return [...new Set(arr)];
}
```

