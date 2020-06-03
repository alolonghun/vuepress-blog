# TypeScript 基础

## 数组
#### 数组 和 元组
```ts
let list: number[] = [1, 2, 3]; // 数组
let list: Array<number> = [1, 2, 3]; // 数组泛型
let list: [string, number] = ['sky', 100]; // 元组
```

#### 只读数组
```ts
let arr: number[] = [1, 2, 3, 4];
let temp: ReadonlyArray<number> = arr;

temp[0] = 100; // !!!error
```

## 枚举
```ts
// 默认元素编号从 0 开始
// 如果 Red = 'red', 那么 Green 和 Blue 都需要赋值，否则会报错
enum Color { Red = 2, Green, Blue }
let c: Color = Color.Red;
```

## 接口
#### 对象类型接口
```ts
interface propBox {
    name: string; 
    color?: number; // 可选属性
    readonly x: number; // 只读属性
}
```

#### 函数类型接口
```ts
// 只需定义函数的 参数列表 和 返回值
interface fn {
    (name: string, age: number): object
}

let foo: fn;
foo = function(name: string, age: number) {
    return {name, age};
}
```

#### 接口继承
```ts
interface Shape {
    color: string;
}
interface Square extends Shape {
    sideLength: number;
}
```

## Class 类型 
```ts
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}

class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}
```

## 泛型
#### 泛型变量
```ts
// 返回类型 必须和 参数类型 一致，但是类型并没有限制
function identity<T>(arg: T): T {
    return arg;
}
```

