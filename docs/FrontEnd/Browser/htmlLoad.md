# HTML 加载与解析

## 整体流程
1. 浏览器加载到的 HTML 文件，其实质就是一个包含字符串的文件；
2. 浏览器会将 HTML 文件里的字符串读取到内存中，然后对字符串进行取词编译，将字符串转化成另一种数据结构；
3. 浏览器会对转化后的数据结构自上而下进行分析：
- 首先根据优先级，对所有的资源进行排序下载；
- 与此同时，渲染进程主线程会对文档进行解析：
    - 遇到 DOM 标签时，执行 DOM 构建，将该 DOM 元素添加到 DOM 树中；
    - 遇到script标签时，检查该 script 是否已经下载下来：
        - 若是未下载完成，则等待下载完成（下载完立即执行代码），等待期间会阻塞其后 HTML 内容的解析；
        - 若是已下载，便执行代码，执行代码期间也会阻塞其后 HTML 内容的解析；
        - 总之，遇到script标签，一定会阻塞其后 HTML 内容的解析，直到文件加载完成并执行完成之后，才能继续解析其后的 HTML 内容；
    - 遇到link标签时，检查link资源是否已下载：
        - 若是已下载，则开始构建 CSSOM 树，同时继续解析其后的 HTML 内容
        - 若是未下载完成，则继续解析其后的 HTML 内容
        - 总之，无论link标签里的文件是否下载，都不会阻塞其后 HTML 内容的解析；但是因为 CSSOM 树还未构建完成，会阻塞页面渲染。