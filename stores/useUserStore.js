import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
    state: () => ({
        id: null,
        user: null,
        token: null,
        invite: null,

    }),
    actions: {
        setUser(id,userData, token) {
            console.log("-------------setUser---------------")
            this.id = id;
            this.user = userData;
            this.token = token;
            // 获取当前时间并设置过期时间为 1 小时后
            const inOneHour = new Date(new Date().getTime() + 60 * 60 * 1000);
            // 设置 token 到 cookie
            const tokenCookie = useCookie('token', { expires: inOneHour });
            tokenCookie.value = token;
            const idCookie = useCookie('id', { expires: inOneHour });
            idCookie.value = id;
            // 设置用户信息到另一个 cookie
            const userCookie = useCookie('userInfo', { expires: inOneHour });
            userCookie.value = userData;
        },
        setInvite(invite) {
            const inOneHour = new Date(new Date().getTime() + 60 * 60 * 1000);
            console.log("-------------setUser---------------")
            this.invite = invite.value;
            // 设置用户信息到另一个 cookie
            const inviteCookie = useCookie('invite', { expires: inOneHour });
            inviteCookie.value = invite.value;
        },
        clearUser() {
            console.log("-------------clearUser---------------")
            this.user = null;
            this.token = null;
            this.id = null;

            // 清除 cookies
            const tokenCookie = useCookie('token');
            tokenCookie.value = null;
            const idCookie = useCookie('id');
            idCookie.value = null;
            const userCookie = useCookie('userInfo');
            userCookie.value = null;
        },
        restoreUserFromCookie() {
            console.log("-------------restoreUserFromCookie---------------")
            // this.refreshCookieExpiration()
            const tokenCookie = useCookie('token');
            const userCookie = useCookie('userInfo');
            const idCookie = useCookie('id');
            if (tokenCookie.value && userCookie.value) {
                this.token = tokenCookie.value;
                this.user = userCookie.value;
                this.id = idCookie.value;
            }

        },
        refreshCookieExpiration() {
            console.log("-------------refreshCookieExpiration---------------")
            const inOneHour = new Date(new Date().getTime() + 60 * 60 * 1000);

            // 如果存在 token，更新其过期时间
            const tokenCookie = useCookie('token');
            if (tokenCookie.value) {
                tokenCookie.value = tokenCookie.value; // 重新设置 token 的值
                document.cookie = `token=${tokenCookie.value};expires=${inOneHour.toUTCString()}`; // 更新 expires
            }
            const idCookie = useCookie('id');
            if (idCookie.value) {
                idCookie.value = idCookie.value; // 重新设置 token 的值
                document.cookie = `id=${idCookie.value};expires=${inOneHour.toUTCString()}`; // 更新 expires
            }
            // 如果存在用户信息，更新其过期时间
            const userCookie = useCookie('userInfo');
            if (userCookie.value) {
                userCookie.value = userCookie.value; // 重新设置 userInfo 的值
                document.cookie = `userInfo=${userCookie.value};expires=${inOneHour.toUTCString()}`; // 更新 expires
            }
        },
        async login(credentials) {
            try {
                const response = await axios.post('/api/users/login', JSON.stringify(credentials), {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.data;
                if (data && data.token) {
                    this.setUser(data.user.id,data.user, data.token);
                } else {
                    throw new Error(data.message || 'Login failed');
                }
            } catch (error) {
                console.log("-------------Login clearUser---------------")
                this.clearUser();
                throw error; // 继续抛出错误以供调用者处理
            }
        },
        logout() {
            console.log("-------------logout clearUser---------------")
            this.clearUser();
            // 可能还需要添加向服务器发送登出请求的逻辑
        },
    },
});
