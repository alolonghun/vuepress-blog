# BFC

## FC
`FC（formatting context）`，直译为是 **格式化上下文**，它是页面中的一块渲染区域，有一套渲染规则，决定了其子元素如何布局，以及和其他元素之间的关系和作用；

> 常见的 FC 有 BFC、IFC（行级格式化上下文）、GFC（网格布局格式化上下文）和 FFC（自适应格式化上下文）；

## BFC
`BFC（Block formatting context）`，直译为 **块级格式化上下文**，它是一个独立的渲染区域，只有 `Block-level Box` 参与， 它规定了内部的 `Block-level Box` 如何布局，并且与这个区域外部毫不相干；

## 生成BFC的条件
1. 根元素，即 `html` 元素
2. `float` 值不为 `none` 的元素
3. `position` 值为 `absolute`、`fixed` 的元素
4. `overflow` 值不为 `visible` 的元素
5. `display` 值为 `inline-block`、`table-cell`、`flex`、`grid` 等的元素

## BFC布局的规则
1. 内部的 `Box` 会在垂直方向，一个接一个地放置；
2. `Box` 垂直方向的距离由 `margin` 决定。属于同一个 `BFC` 的两个相邻 `Box` 的 `margin` 会发生重叠；
3. 每个元素的 `margin box` 的左边，与包含块 `border box` 的左边相接触(对于从左往右的格式化，否则相反)；即使存在浮动也是如此；
4. `BFC` 的区域不会与 `float box` 重叠；
5. `BFC` 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素；反之也如此；
6. 计算 `BFC` 的高度时，浮动元素也参与计算；

## BFC的应用场景
1. **自适应两栏布局**：利用 `BFC规则4`；
2. **垂直两元素 margin 重叠问题**：利用 `BFC规则2`；
3. **清除浮动和父元素高度塌陷**：利用 `BFC规则6`；
4. **父子元素外边距合并问题**：利用 `BFC规则3`；

* * *

参考文章链接：
- [MDN 块级格式化上下文](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)
- [关于CSS-BFC深入理解](https://juejin.im/post/5909db2fda2f60005d2093db)



