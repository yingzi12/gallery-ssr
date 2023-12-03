// stores/useDataStore.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
    state: () => ({
        user: null,
    }),
    actions: {
        setUser(userData) {
            this.user = userData;
        },
        clearUser() {
            this.user = null;
        },
        async login(credentials) {
            try {
                const userData = await loginUser(credentials); // loginUser 是一个 API 请求函数
                this.setUser(userData);
            } catch (error) {
                this.clearUser();
                throw error;
            }
        },
        logout() {
            this.clearUser();
            // 这里可能需要更多的逻辑，如通知服务器登出
        },
    },
});
