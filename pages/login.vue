<script setup lang="ts">
import { useQuasar } from 'quasar';
const fourth =ref(true);
const $q = useQuasar()

const username = ref(null)
const password = ref(null)
const accept = ref(false)
if (accept.value !== true) {
  $q.notify({
    color: 'red-5',
    textColor: 'white',
    icon: 'warning',
    message: 'You need to accept the license and terms first'
  })
}
else {
  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'cloud_done',
    message: 'Submitted'
  })
}
function  onReset () {
  name.value = null
  age.value = null
  accept.value = false
}
function onSubmit () {
  if (accept.value !== true) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'You need to accept the license and terms first'
    })
  }
  else {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Submitted'
    })
  }
}
//保存登录数据到pinia缓存数据
import { ref } from 'vue';
import { useUserStore } from '@/stores/useUserStore';

const email = ref('');
const password = ref('');
const userStore = useUserStore();

const loginUser = async () => {
  try {
    await userStore.login({ email: email.value, password: password.value });
    // 登录成功后的逻辑
  } catch (error) {
    // 处理登录错误
  }
};
</script>

<template>

  <div class="center-container">
    <div class="q-pa-md" style="max-width: 400px">
      <q-card class="my-card">
<!--        <img src="https://cdn.quasar.dev/img/mountains.jpg">-->

        <q-card-section>
          <div class="text-h6">登录</div>
          <div class="text-subtitle2">登录图集，创建属于你的图集</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form
              @submit="onSubmit"
              @reset="onReset"
              class="q-gutter-md"
          >
            <!-- 账号输入框 -->
            <q-input
                filled
                v-model="username"
                label="账号 *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please enter your account']"
            />

            <!-- 密码输入框 -->
            <q-input
                filled
                type="password"
                v-model="password"
                label="密码 *"
                lazy-rules
                :rules="[
            val => val && val.length > 0 || 'Please enter your password'
            ]"
            />

            <q-toggle v-model="accept" label="I accept the license and terms" />

            <div>
              <q-btn label="登录" type="submit" color="primary" style="width: 100%;"/>
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