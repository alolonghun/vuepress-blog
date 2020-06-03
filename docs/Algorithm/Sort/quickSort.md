# 快速排序

## 原理图
![快速排序](./imgs/quickSort.gif)

## 核心思想（分治）
1. 选择一个基准元素 `target`（一般选择第一个数）；
2. 将比 `target` 小的元素移动到数组左边，比 `target` 大的元素移动到数组右边；
3. 分别对 `target` 左侧和右侧的元素再进行以上两个步骤；

## 实现代码 - 需要额外空间
```js
function quickSort(arr) {
    if (arr.length < 2) {
        return arr;
    }

    const target = arr[0];
    const left = [];
    const right = [];

    for (let i = 1; i < arr.length; i ++) {
        if (arr[i] < target) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat(target, quickSort(right));
}
```

## 实现代码 - 无需额外空间（填坑法）
```js
function quickSort(arr, start, end) {
    if (end - start < 1) return;

    const target = arr[start];
    // 初始化左右指针
    let l = start,
        r = end;
    
    while (l < r) {
        while (l < r && target <= arr[r]) {
            r --;
        }
        // 比 target 小的元素，都放到左边
        arr[l] = arr[r]; 
        while (l < r && target > arr[l]) {
            l ++;
        }
        // 比 target 大的元素，都放到右边
        arr[r] = arr[l]; 
    }
    // 循环完之后 arr[l] 和 arr[r] 值相同，于是把 target 赋值给 arr[l]
    arr[l] = target; 
    quickSort(arr, start, l - 1);
    quickSort(arr, l + 1, end);

    return arr;
}
```

## 复杂度
时间复杂度：平均 `O(nlogn)`，最坏 `O(n2)`，实际上大多数情况下小于 `O(nlogn)`<br>
空间复杂度：`O(logn)`（递归调用消耗）