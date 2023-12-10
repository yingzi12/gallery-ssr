export default function ({ app }) {
    app.router.afterEach((to, from) => {
        // 在路由跳转完成后执行的逻辑
        // 这里可以拦截 API 的返回值并进行处理
        // 例如，在控制台打印返回值
        console.log('API response intercepted:', app.$apiResponse);
    });

    // 在请求拦截阶段，可以使用 app.$axios 拦截请求并处理
    app.$axios.onRequest((config) => {
        // 在发送请求之前执行的逻辑
        // 这里可以对请求进行自定义处理
        console.log('API request intercepted:', config);
    });

    // 在响应拦截阶段，可以使用 app.$axios 拦截响应并处理
    app.$axios.onResponse((response) => {
        // 在接收到响应后执行的逻辑
        // 这里可以对响应进行自定义处理
        console.log('API response intercepted:', response.data);
        app.$apiResponse = response.data; // 将响应数据存储在 app 上以供后续使用
    });

    // 在响应错误拦截阶段，可以使用 app.$axios 拦截响应错误并处理
    app.$axios.onError((error) => {
        // 在响应出现错误时执行的逻辑
        // 这里可以对错误进行自定义处理
        console.error('API response error intercepted:', error);
    });
}
