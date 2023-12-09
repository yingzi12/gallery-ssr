
export default defineEventHandler((event) => {
    var url=event.path;
// 检查当前路由是否位于 /api/admin 下
    if (url.startsWith('/api/admin')) {
        try {
            const cookies = parseCookies(event)
            console.log(cookies)

            const token = cookies["token"]; // 从用户存储库中获取token
            console.log("token:"+token)
            event.headers
            // 将token添加到请求头中
            event.headers.set('Authorization', `Bearer ${token}`);
        } catch (error) {
            // 处理获取token失败的情况
            console.error('Failed to get token from user store:', error);
            // 可以根据需要执行重定向或其他操作
            // redirect('/login'); // 例如，重定向到登录页
        }
    }
    console.log('New request: ' + getRequestURL(event))
})
