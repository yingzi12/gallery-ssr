<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useUserStore } from '@/stores/useUserStore';
const router = useRouter(); // 使用 Vue Router 的 useRouter 函数

const $q = useQuasar();
const userStore = useUserStore();
const username = ref('');
const password = ref('');
const uuid = ref('');
const code = ref('');
const captcha = ref('');
const accept = ref(false);
const captchaImage = ref('');

// 修正此函数
async function refreshCaptcha() {
  try {
    const { data } = await useFetch("/api/users/captcha");
    if (data.value.code == 200) {
      captchaImage.value = "data:image/png;base64," + data.value.img;
      uuid.value = data.value.uuid;
    }
  } catch (error) {
    // 处理错误，例如显示通知
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'error',
      message: 'Failed to load captcha'
    });
  }
}

async function onSubmit() {
  if (!accept.value) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'You need to accept the license and terms first'
    });
    return;
  }

  try {
    await userStore.login({
      username: username.value,
      password: password.value,
      uuid: uuid.value,
      code: captcha.value,
      captcha: captcha.value,
    });
    if (userStore.token) {
      // 登录成功，重定向到主页或其他页面
      router.push('/users/'); // 或者其他页面
    } else {
      // 登录失败，但没有抛出错误
      $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'error',
        message: 'Login failed'
      });
    }
  } catch (error) {
    refreshCaptcha();
    // 处理登录错误
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'error',
      message: error.message || 'Login failed'
    });
  }
}
function isLogin(){
  if (userStore.user) {
    // 如果用户未登录，则重定向到登录页面
    router.push('/users'); // 假设登录页面的路由为 '/login'
  }
}

onMounted(() => {
  userStore.restoreUserFromCookie();
  isLogin();
  // 当组件挂载时，刷新验证码
  refreshCaptcha();
});
</script>


<template>
  <div class="center-container">
    <div class="q-pa-md" style="max-width: 400px">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">登录</div>
          <div class="text-subtitle2">登录图集，创建属于你的图集</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit.prevent="onSubmit" class="q-gutter-md">
            <!-- 账号输入框 -->
            <q-input
                filled
                v-model="username"
                label="账号 *"
                lazy-rules
                :rules="[val => val && val.length > 0 || 'Please enter your account']"
            />

            <!-- 密码输入框 -->
            <q-input
                filled
                type="password"
                v-model="password"
                label="密码 *"
                lazy-rules
                :rules="[val => val && val.length > 0 || 'Please enter your password']"
            />

            <!-- 验证码输入框 -->
            <q-input
                filled
                v-model="captcha"
                label="验证码 *"
                lazy-rules
                :rules="[val => val && val.length > 0 || '请输入验证码']"
            />
            <div class="q-mb-md">
              <img :src="captchaImage" @click="refreshCaptcha">
              <div>点击图片刷新验证码</div>
            </div>

            <!-- 接受条款切换 -->
            <q-toggle v-model="accept" label="I accept the license and terms" />

            <div>
              <q-btn label="登录" type="submit" color="primary" style="width: 100%;" />
            </div>

            <!-- 注册与忘记密码链接 -->
            <div class="extra-links">
              <router-link to="/register">注册</router-link>
              <router-link to="/forgot-password">忘记密码?</router-link>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<style scoped>
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* 使容器至少与视口一样高 */
}

.extra-links {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>