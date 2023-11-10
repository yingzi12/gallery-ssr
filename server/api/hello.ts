// 内部的文件~/server/api会自动在其路径中添加前缀/api。
// 要添加不带/api前缀的服务器路由，请将它们放入~/server/routes目录中。
export default defineEventHandler((event) => {
    const  ces="这是服务器的代码不能开"
    return {
        hello: 'world'
    }
})
