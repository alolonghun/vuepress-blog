# 简易的 Generator CO 模块

## 代码实现
```js
function run(genFunc) {
    const it = genFunc();
    let result = it.next();

    return new Promise((resolve, reject) => {
        const next = function(result) {
            if (result.done) {
                resolve(result.value);
            }
            result.value = Promise.resolve(result.value);
            result.value.then(res => {
                let result = it.next(res);

                next(result);
            }).catch(err => {
                reject(err);
            })
        }
        next(result);
    })
}
```