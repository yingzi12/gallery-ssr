<script setup  lang="ts">
definePageMeta({
  key: route => route.fullPath
})
import { useUserStore } from '@/stores/useUserStore';
const userStore = useUserStore();
const lorem= 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
const previewImage = (userStore.user == null || userStore.user.imgUrl==null) ?"/favicon.png": userStore.user.imgUrl;

const router = useRouter(); // 使用 Vue Router 的 useRouter 函数
onMounted(() => {
  userStore.restoreUserFromCookie();

  // 当组件挂载时检查用户的登录状态
  if (!userStore.user || !userStore.token) {
    // 如果用户未登录，则重定向到登录页面
    router.push('/login'); // 假设登录页面的路由为 '/login'
  } else {
    console.log(userStore.token)
    console.log(JSON.stringify(userStore.user))
  }
})
</script>

<template>
  <div>
    <router-link to="/users/userHeadImage">
      <q-btn color="primary" label="编辑头像" />
    </router-link>
    <router-link to="/users/userEdit">
      <q-btn color="primary" label="编辑个人信息" />
    </router-link>
  </div>

  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <q-item>
        <q-item-section >
          <q-avatar v-if="userStore.user"  size="100px" font-size="52px">
            <img :src="previewImage">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{  userStore.user!=null ? userStore.user.nickname : '待登录'  }} ({{userStore.user!=null ? userStore.user.name : '待登录'}})</q-item-label>
          <q-item-label v-if="userStore.user" caption>
            ID:{{ userStore.user.id }}
          </q-item-label>
          <q-item-label v-if="userStore.user" caption>
            {{ userStore.user.email }}<q-icon v-if="userStore.user && userStore.user.isEmail ==2 " name="warning" style="color: red" />
          </q-item-label>
          <q-item-label  v-if="userStore.user && userStore.user.isEmail ==2 " caption>
            （点击发送邮箱验证码）
          </q-item-label>
        </q-item-section>

      </q-item>

      <q-separator />

      <q-card-section v-if="userStore.user" horizontal>
        {{ userStore.user.intro  }}
      </q-card-section>
      <q-separator />

      <q-card-actions>
        <q-btn flat round icon="favorite"  color="red-8">{{ userStore.user!=null ?   userStore.user.countAttention :0 }}</q-btn>
        <q-btn flat round icon="thumb_up" color="red-8">{{ userStore.user!=null ? userStore.user.countLike  :0}}</q-btn>
        <q-btn flat round icon="visibility" color="red-8">{{ userStore.user!=null ? userStore.user.countSee :0  }}</q-btn>
      </q-card-actions>
    </q-card>


  </div>
</template>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>