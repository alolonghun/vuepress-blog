module.exports = {
    base: '/vuepress-blog/',
    title: 'Hi Sky',
    description: 'HTML、CSS、JavaScript、Node.js、Vue、React、算法',
    head: [
        ['link', { rel: 'icon', href: '/assets/img/logo.png' }]
    ],
    themeConfig: {
        logo: '/assets/img/logo.png',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'JavaScript', link: '/JavaScript/' }
        ],
        navbar: true,
        sidebar: {
            '/JavaScript/': [
                ['', '前言'],
                {
                    title: '手写 API 系列',
                    collapsable: false,
                    children: [
                        ['HandWriting/call&apply&bind', 'call、apply 和 bind'],
                        ['HandWriting/new', 'new'],
                    ]
                },
                {
                    title: '防抖 和 节流',
                    collapsable: false,
                    children: [
                        ['Debounce&Throttle/debounce', 'debounce'],
                        ['Debounce&Throttle/throttle', 'throttle'],
                    ]
                },
                {
                    title: '数组系列',
                    collapsable: false,
                    children: [
                        ['Array/unique', '数组去重'],
                        ['Array/flatten', '数组扁平化'],
                        ['Array/disorder', '数组乱序'],
                    ]
                }
            ]
        },
        search: true,
        searchMaxSuggestions: 10
    },
    markdown: {
        lineNumbers: false
    }
}