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

            // 获取当前时间并设置过期时间为 1 小时后
            const inOneHour = new Date(new Date().getTime() + 60 * 60 * 1000);

            // 设置 token 到 cookie
            const tokenCookie = useCookie('token', { expires: inOneHour });
            tokenCookie.value = token;

            // 设置用户信息到另一个 cookie
            const userCookie = useCookie('userInfo', { expires: inOneHour });
            userCookie.value = userData;
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
            // this.refreshCookieExpiration()
            const tokenCookie = useCookie('token');
            const userCookie = useCookie('userInfo');

            if (tokenCookie.value && userCookie.value) {
                this.token = tokenCookie.value;
                this.user = userCookie.value;
            }

        },
        refreshCookieExpiration() {
            const inOneHour = new Date(new Date().getTime() + 60 * 60 * 1000);

            // 如果存在 token，更新其过期时间
            const tokenCookie = useCookie('token');
            if (tokenCookie.value) {
                tokenCookie.options.expires = inOneHour;
            }

            // 如果存在用户信息，更新其过期时间
            const userCookie = useCookie('userInfo');
            if (userCookie.value) {
                userCookie.options.expires = inOneHour;
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
