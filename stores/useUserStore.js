// stores/useDataStore.js
import { defineStore } from 'pinia';
import { useQuasar } from 'quasar';

export const useUserStore = defineStore('userStore', {
    state: () => ({
        user: null,
        token: null,
    }),
    actions: {
        setUser(userData, token) {
            this.user = userData;
            this.token = token;
        },
        clearUser() {
            this.user = null;
            this.token = null;
        },
        async login(credentials) {
            const $q = useQuasar();

            try {
                const { data } = await useFetch("/api/users/login", {
                    method: "post",
                    body: credentials,
                });
                if (data.value && data.value.token) {
                    console.log("登录成功："+ data.value.token);
                    console.log("登录成功："+ JSON.stringify(data.value.user));

                    this.setUser(data.value.user, data.value.token);
                } else {
                    throw new Error(data.value.message);
                }
            } catch (error) {
                this.clearUser();
                // // 显示错误通知
                // $q.notify({
                //     color: 'red-5',
                //     textColor: 'white',
                //     icon: 'warning',
                //     message: error.message || 'Unknown error'
                // });

                throw error; // 如果需要，可以继续抛出这个错误
            }
        },
        async logout() {
            this.clearUser();
            // 这里可能需要更多的逻辑，如通知服务器登出
            await useFetch("/api/users/logout");
        },
    },
});
