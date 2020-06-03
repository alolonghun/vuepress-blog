# 数据监听

## 核心流程
- `Vue` 在初始化数据的时候，会利用 `Object.defineProperty` 方法劫持数据的属性，改写 `getter` 和 `setter` 操作符；
- 在 `getter` 触发时，使用闭包 `Dep` 进行 `Watcher` 的收集；
- 在 `setter` 触发时，通知相应的 `Watcher` 派发更新；

## 简单代码实现
```js
// 缓存数组原型
const oldArrayProto = Array.prototype;
// 创建对象，原型指向数组原型，这样扩展数组方法就不会影响原型
const arrProto = Object.create(oldArrayProto);
['push', 'pop', 'unshift', 'shift', 'splice'].forEach(arrMethod => {
    arrProto[arrMethod] = function() {
        Object.getPrototypeOf(arrProto)[arrMethod].call(this, ...arguments);
        updateView(); // 派发更新
    }
})

function defineReactive(target, key, value) {
    observe(value); // 深度监听

    Object.defineProperty(target, key, {
        get () {
            return value;
        },
        set (newVal) {
            // 原本不是对象，后边被设置为对象，进行深度监听
            observe(newVal); 
            if (newVal !== value) {
                value = newVal; 
                updateView(); // 派发更新
            }
        }
    })
}

function observe(target) {
    if (typeof target !== 'object' || 
        target === null) {
        return target;
    }

    if (Array.isArray(target)) {
        target.__proto__ = arrProto;
    }

    for (let i in target) {
        defineReactive(target, i, target[i]);
    }
}
```