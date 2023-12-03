<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useUserStore } from '@/stores/useUserStore';

const $q = useQuasar();
const userStore = useUserStore();
const username = ref('');
const password = ref('');
const captcha = ref('');
const accept = ref(false);
const captchaImageUrl = ref('url_to_your_captcha_endpoint');

function refreshCaptcha() {
  captchaImageUrl.value = 'url_to_your_captcha_endpoint?rand=' + Math.random();
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
      captcha: captcha.value,
    });
    // 登录成功后的逻辑
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Submitted'
    });
  } catch (error) {
    // 处理登录错误
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'error',
      message: 'Login failed'
    });
  }
}
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
              <img :src="captchaImageUrl" @click="refreshCaptcha">
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