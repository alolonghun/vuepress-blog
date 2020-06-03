module.exports = {
    base: '/vuepress-blog/',
    title: 'Hi Sky',
    description: 'HTML、CSS、JavaScript、Node.js、Vue、React、算法等',
    head: [
        ['link', { rel: 'icon', href: '/assets/img/logo.png' }]
    ],
    themeConfig: {
        logo: '/assets/img/logo.png',
        nav: [
            { text: 'Home', link: '/' },
            { 
                text: 'Front End', 
                collapsable: true,
                items: [
                    { text: 'HTML', link: '/FrontEnd/HTML/' },
                    { text: 'CSS', link: '/FrontEnd/CSS/' },
                    { text: 'JavaScript', link: '/FrontEnd/JavaScript/' },
                    { text: 'MVVM', link: '/FrontEnd/MVVM/' },
                    { text: 'Browser', link: '/FrontEnd/Browser/' },
                    { text: '前端工程化', link: '/FrontEnd/Engineering/' },
                ]
            },
            { text: '算法', link: '/Algorithm/' },
            { text: 'HTTP', link: '/HTTP/' }
        ],
        navbar: true,
        sidebar: {
            '/FrontEnd/JavaScript/': [
                ['', '前言'],
                {
                    title: 'Polyfill',
                    collapsable: true,
                    children: [
                        ['Polyfill/call&apply&bind', 'call/apply/bind'],
                        ['Polyfill/new', 'new'],
                        ['Polyfill/instanceof', 'instanceof'],
                        ['Polyfill/debounce', 'debounce'],
                        ['Polyfill/throttle', 'throttle'],
                        ['Polyfill/CO', 'CO 模块'],
                    ]
                },
                {
                    title: '数组',
                    collapsable: true,
                    children: [
                        ['Array/unique', '数组去重'],
                        ['Array/flatten', '数组扁平化'],
                        ['Array/max', '数组最值'],
                        ['Array/disorder', '数组乱序'],
                    ]
                },
                {
                    title: 'Babel 与 AST',
                    collapsable: true,
                    children: [
                        ['Babel/AST', 'AST'],
                        ['Babel/recast', 'recast']
                    ]
                },
                {
                    title: '函数式编程',
                    collapsable: true,
                    children: [
                        ['FunctionalProgramming/FunctionalProgramming', '函数式编程概览'],
                    ]
                },
                {
                    title: 'TypeScript',
                    collapsable: true,
                    children: [
                        ['TypeScript/base', 'TypeScript 基础'],
                    ]
                }
            ],
            '/FrontEnd/CSS/': [
                ['', '前言'],
                {
                    title: '布局',
                    collapsable: true,
                    children: [
                        ['Layout/BFC', 'BFC'],
                    ]
                }
            ],
            '/FrontEnd/HTML/': [
                ['', '前言'],
                ['domTree', 'DOM 树'],
                ['node', 'DOM 节点和元素'],
                ['sizeAndScroll', 'DOM 元素大小和滚动'],
            ],
            '/FrontEnd/MVVM/': [
                ['', '前言'],
                {
                    title: 'Vue',
                    collapsable: true,
                    children: [
                        ['Vue/dataListener', '数据监听']
                    ]
                }
            ],
            '/FrontEnd/Browser/': [
                ['', '前言'],
                ['htmlLoad', 'HTML 加载与解析']
            ],
            '/FrontEnd/Engineering/': [
                ['', '前言'],
                {
                    title: 'Webpack',
                    collapsable: true,
                    children: [
                        ['Webpack/baseConfig', '基础配置'],
                        ['Webpack/expandConfig', '进阶配置'],
                        ['Webpack/loaderAndPlugin', '编写 Loader 和 Plugin'],
                    ]
                }
            ],
            '/Algorithm/': [
                ['', '前言'],
                {
                    title: '排序算法',
                    collapsable: true,
                    children: [
                        ['Sort/bubbleSort', '冒泡排序'],
                        ['Sort/selectSort', '选择排序'],
                        ['Sort/insertSort', '插入排序'],
                        ['Sort/quickSort', '快速排序'],
                        ['Sort/mergeSort', '归并排序'],
                    ]
                }
            ],
            '/HTTP/': [
                ['', '前言'],
                {
                    title: 'DNS',
                    collapsable: true,
                    children: [
                        ['DNS/dns', 'DNS 解析过程'],
                    ]
                }
            ]
        },
        search: true,
        searchMaxSuggestions: 10
    },
    markdown: {
        lineNumbers: true
    }
}