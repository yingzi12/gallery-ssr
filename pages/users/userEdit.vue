<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/useUserStore';

const $q = useQuasar();
const router = useRouter();
const userStore = useUserStore();

const nickname = ref('');
const email = ref('');
const description = ref('');
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
  formData.append('description', description.value);
  if (selectedFile.value) {
    formData.append('file', selectedFile.value);
  }

  try {
    const response = await fetch('/admin/edit', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${userStore.token}` // 确保您的 token 是有效的
      },
      body: formData
    });

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
      <q-input filled v-model="description" label="Description *" :rules="[val => !!val || 'Please enter a description']" />

      <q-toggle v-model="accept" label="I accept the license and terms" />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>
