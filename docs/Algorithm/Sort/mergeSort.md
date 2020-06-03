# 归并排序

## 原理图
![归并排序](./imgs/mergeSort.gif)

## 核心思想（分治）
- 分割：
    1. 将数组从中点进行分割，分为左、右两个数组；
    2. 递归分割左、右数组，直到数组 `length < 2`；
- 合并：
    1. 创建一个临时数组，用来存放比较结果；
    2. 左、右两数组都使用第一个元素进行比较，小的元素被 `shift`，并放入临时数组中，直到左、右两数组被清空；

## 实现代码
```js
function mergeSort(array) {
    if (array.length < 2) {
        return array;
    }
    const mid = Math.floor(array.length / 2);
    const left = array.slice(0, mid);
    const right = array.slice(mid);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    const temp = [];

    while (left.length && right.length) {
        if (left[0] < right[0]) {
            temp.push(left.shift());
        } else {
            temp.push(right.shift());
        }
    }
    while (left.length) {
        temp.push(left.shift());
    }
    while (right.length) {
        temp.push(right.shift());
    }

    return temp;
}
```

## 复杂度
时间复杂度：`O(nlogn)`<br>
空间复杂度：`O(n)`