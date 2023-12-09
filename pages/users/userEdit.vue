<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/useUserStore';
const router = useRouter(); // 使用 Vue Router 的 useRouter 函数

const $q = useQuasar();
const userStore = useUserStore();
const userInfoCookie = useCookie('userInfo');
const userInfo=userStore.user;

const nickname = ref('');
const email = ref('');
const intro = ref('');
nickname.value=userInfo.nickname;
email.value=userInfo.email;
intro.value=userInfo.intro;

const accept = ref(false);
const selectedFile = ref(null);

const onSubmit = async () => {
  if (!accept.value) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'You need to accept the license and terms first'
    });
    return;
  }

  const formData = new FormData();
  formData.append('nickname', nickname.value);
  formData.append('email', email.value);
  formData.append('intro', intro.value);
  if (selectedFile.value) {
    formData.append('file', selectedFile.value);
  }

  try {
    const response = await fetch("/api/admin/users/edit", {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nickname: nickname.value,
        email: email.value,
        intro: intro.value,
      }),
    });
    const data = await response.json();
    if(data.code==200){

      userInfo.isEmail=data.data.isEmail;
      userInfo.nickname=data.data.nickname;
      userInfo.intro=data.data.intro;
      userInfo.email=data.data.email;
      userInfoCookie.value=userInfo;

      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Update Success'
      });
      router.push('/users'); // Redirect to login page

    }else {
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Update Error'
      });
    }

    // 检查响应...
  } catch (error) {
    // 处理错误...
  }
};

</script>

<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit.prevent="onSubmit" class="q-gutter-md">

      <q-input filled v-model="nickname" label="Your Name *" :rules="[val => !!val || 'Please enter your nickname']" />
      <q-input filled v-model="email" type="email" label="E-mail *" :rules="[val => !!val || 'Please enter your email']" />
      <q-input filled v-model="intro" label="Intro *" :rules="[val => !!val || 'Please enter a Intro']" />

      <q-toggle v-model="accept" label="I accept the license and terms" />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>
