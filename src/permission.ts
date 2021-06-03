import router from './router'
router.beforeEach(async (to, from, next) => {
    // to 目标地址
    // form 从哪里来
    next() // 继续进行或者 next内部传入参数 例如 {name:"xxxx",url:"xxxxx"}进行控制跳转
})