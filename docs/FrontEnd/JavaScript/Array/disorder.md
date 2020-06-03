# 数组乱序

#### 核心思想
1. 初始指针指向最后一个元素，接着取一个随机下标的元素，进行位置交换；
2. 指针前移，重复第一步，直到第一个元素；

```js
function disorder(arr) {
    const length = arr.length;
    let current = length - 1;
    let random;

    while (current > -1) {
        random = Math.floor(length * Math.random());
        [arr[current], arr[random]] = [arr[random], arr[current]];
        current --;
    }
    return arr;
}
```