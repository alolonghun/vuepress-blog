# 冒泡排序

## 原理图
![冒泡排序](./imgs/bubbleSort.gif)

## 核心思想
1. 每次循环中，比较当前元素和下一个元素，如果当前元素比后一个元素大，则交换位置；
2. 循环一次之后，数组的最后一个元素就是最大的元素；
3. 下一次循环继续上边的操作，不循环已经排序的元素；

## 实现代码
```js
function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i ++) {
        // 结束标志位（如果一次遍历中没有出现冒泡，则表示已经排序完成）
        let is_completed = true; 

        for (let j = 0; j < arr.length - 1 - i; j ++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                is_completed = false;
            }
        }
        if (is_completed) {
            break;
        }
    }
    return arr;
}
```

## 复杂度
时间复杂度：`O(n2)`<br>
空间复杂度：`O(1)`