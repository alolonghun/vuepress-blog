# 插入排序

## 原理图
![插入排序](./imgs/insertSort.gif)

## 核心思想
1. 将左侧序列看成一个有序序列，每次将一个元素插入到该序列中；
2. 元素 `target` 插入时，从有序序列最右边开始比较；
    - 遇到比 `target` 大的元素就交换位置，然后继续往前对比；
    - 遇到比 `target` 小的元素 `A`，就把 `target` 插入到 `A` 的后边；

## 实现代码
```js
function insertSort(arr) {
    for (let i = 0; i < arr.length; i ++) {
        let target = i;

        for (let j = i - 1; j > 0; j --) {
            if (arr[j] > target) {
                // 遇到比 target 大的元素就交换位置
                [arr[j], arr[target]] = [arr[target], arr[j]];
                target = j;
            } else {
                break;
            }
        }
    }
    return arr;
}
```

## 复杂度
时间复杂度：`O(n2)`<br>
空间复杂度：`O(1)`