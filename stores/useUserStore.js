import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
    state: () => ({
        user: null,
        token: null,
    }),
    actions: {
        setUser(userData, token) {
            this.user = userData;
            this.token = token;

            // 设置 token 到 cookie
            const tokenCookie = useCookie('token');
            tokenCookie.value = token;

            // 设置用户信息到另一个 cookie
            const userCookie = useCookie('userInfo');
            userCookie.value = userData; // 用户信息应该是一个可序列化的对象
        },
        clearUser() {
            this.user = null;
            this.token = null;
            // 清除 cookies
            const tokenCookie = useCookie('token');
            tokenCookie.value = null;
            const userCookie = useCookie('userInfo');
            userCookie.value = null;
        },
        restoreUserFromCookie() {
            const tokenCookie = useCookie('token');
            const userCookie = useCookie('userInfo');

            if (tokenCookie.value && userCookie.value) {
                this.token = tokenCookie.value;
                this.user = userCookie.value;
            }
        },
        async login(credentials) {
            try {
                const response = await fetch('/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(credentials),
                });

                const data = await response.json();
                if (data && data.token) {
                    this.setUser(data.user, data.token);
                } else {
                    throw new Error(data.message || 'Login failed');
                }
            } catch (error) {
                this.clearUser();
                throw error; // 继续抛出错误以供调用者处理
            }
        },
        async logout() {
            this.clearUser();
            // 可能还需要添加向服务器发送登出请求的逻辑
        },
    },
});
