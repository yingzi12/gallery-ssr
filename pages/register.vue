<script setup lang="ts">
import { useQuasar } from 'quasar';
const $q = useQuasar()
const router = useRouter(); // 使用 Vue Router 的 useRouter 函数

const name = ref(null)
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
  email.value = null
  password.value = null
  accept.value = false
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
    const response = await fetch("/api/users/regis", {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value
      }),
    });
    const data = await response.json();

    if (data && data.code === 200) {
      // Handle successful registration
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Registration successful'
      });
      router.push('/login'); // Redirect to login page
    } else {
      // Handle failed registration
      $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'error',
        message: data.message || 'Registration failed'
      });
    }
  } catch (error) {
    // Handle network or other errors
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'error',
      message: error.message || 'An error occurred'
    });
  }
}

const showPassword = ref(false); // 控制密码的可视化状态

// 用户名和密码的验证规则
const usernameRules = [
  val => /^[a-zA-Z0-9]+$/.test(val) || 'Username must contain only letters and numbers',
  val => val.length >= 5 && val.length <= 20 || 'Username must be between 5 and 20 characters'
];
const passwordRules = [
  val => val.length >= 5 && val.length <= 20 || 'Password must be between 5 and 20 characters'
];

// 切换密码的可视化状态
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<template>

  <div class="center-container">
    <div class="q-pa-md" style="max-width: 400px">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">{{ $t('login.regis') }}</div>
          <div class="text-subtitle2">{{ $t('login.welcome') }}</div>
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
                v-model="name"
                :label="$t('login.name')+' *'"
                :rules="usernameRules"
            />
            <q-input
                filled
                type="email"
                v-model="email"
                :label="$t('login.email')+' *'"
                :rules="[ val => val && val.length > 5 || 'Please enter your email']"
            />

            <!-- 密码输入框 -->
            <q-input
                filled
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                :label="$t('login.password')+' *'"
                :rules="passwordRules"
            >
              <template v-slot:append>
                <q-icon :name="showPassword ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="togglePasswordVisibility" />
              </template>
            </q-input>

            <q-toggle v-model="accept" label="I accept the license and terms" />

            <div>
              <q-btn :label=" $t('login.regis')" type="submit" color="primary" style="width: 100%;"/>
            </div>

            <!-- 注册与忘记密码链接 -->
            <div class="extra-links">
              <router-link to="/login">{{ $t('login.login') }}</router-link>
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