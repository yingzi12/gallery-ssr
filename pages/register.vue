<script setup lang="ts">
import { useQuasar } from 'quasar';
const fourth =ref(true);
const $q = useQuasar()

const username = ref(null)
const email = ref(null)
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
</script>

<template>

  <div class="center-container">
    <div class="q-pa-md" style="max-width: 400px">
      <q-card class="my-card">
        <!--        <img src="https://cdn.quasar.dev/img/mountains.jpg">-->

        <q-card-section>
          <div class="text-h6">注册</div>
          <div class="text-subtitle2">欢迎加入图集，创建属于你的图集</div>
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
            <!-- 账号输入框 -->
            <q-input
                filled
                type="email"
                v-model="email"
                label="Email *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please enter your email']"
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
              <q-btn label="注册" type="submit" color="primary" style="width: 100%;"/>
            </div>

            <!-- 注册与忘记密码链接 -->
            <div class="extra-links">
              <router-link to="/login">登录</router-link>
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