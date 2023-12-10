<script setup lang="ts">
import { useUserStore } from '@/stores/useUserStore';
const userStore = useUserStore();
const  drawer= ref(false);
const link= ref('detail')
const router = useRouter(); // 使用 Vue Router 的 useRouter 函数
const users= ref(null)
const previewImage=ref("\"/favicon.png\"")
//server/api/admin/users/info.get.ts
// async function getDetail(id:number){
//   const response = await fetch('/api/admin/users/info?id'+id.toString(), {
//     method: 'get',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${userStore.token}`
//     },
//     credentials: 'include', // 确保携带 cookie
//   });
//   const data = await response.json();
//   console.log(data)
//   // console.log("users detail.{}",data.code)
//   if(data.code ==401){
//     await userStore.logout();
//     router.push('/login'); // 注销后重定向到登录页面
//   }
//   if(data.code==200){
//     userStore.setUser(userStore.user,userStore.token);
//   }
// }
// 添加注销方法
const logout = async () => {
  await userStore.logout();
  router.push('/login'); // 注销后重定向到登录页面
};
onMounted(() => {
  console.log("000000000000000000000000000000")
  // 当组件挂载时检查用户的登录状态
  if (!userStore.user || !userStore.token) {
    // 如果用户未登录，则重定向到登录页面
    router.push('/login'); // 假设登录页面的路由为 '/login'
  }else{
    previewImage.value = (userStore.user == null || userStore.user.imgUrl==null) ?"/favicon.png": userStore.user.imgUrl;
    console.log(userStore.token)
    console.log(userStore.user)
    console.log(JSON.stringify(userStore.user))
    users.value=userStore.user;

    userStore.refreshCookieExpiration();
    // getDetail(userStore.user.id)

  }
  userStore.restoreUserFromCookie();
});
</script>

<template>
  <div class="q-pa-md" style="height: 100vh;">
    <q-layout view="lHh Lpr lff" container class="shadow-2 rounded-borders">
    <q-header elevated class="bg-cyan-8">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        </q-toolbar>
      </q-header>

      <q-drawer
          v-model="drawer"
          show-if-above
          :width="200"
          :breakpoint="400"
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item  to="/users/"
                clickable
                v-ripple
                :active="link === 'detail'"
                @click="link = 'detail'"
                active-class="my-menu-link"
              >
              <q-item-section avatar>
                <q-icon name="account_circle" />
              </q-item-section>

              <q-item-section>
                {{ $t(`user.personalInfo`) }}
              </q-item-section>
            </q-item>

            <q-item  to="/users/attention"
                clickable
                v-ripple
                :active="link === 'attention'"
                @click="link = 'attention'"
                active-class="my-menu-link"
              >
              <q-item-section avatar>
                <q-icon name="favorite_border" />
              </q-item-section>

              <q-item-section>
                {{ $t(`user.myAttention`) }}
              </q-item-section>
            </q-item>
            <q-item to="/users/collection"
                clickable
                v-ripple
                :active="link === 'collection'"
                @click="link = 'favorite_border'"
                active-class="my-menu-link"
              >
              <q-item-section avatar>
                <q-icon name="star_rate" />
              </q-item-section>

              <q-item-section>
                {{ $t(`user.myCollection`) }}
              </q-item-section>
            </q-item>
            <q-separator  />
            <q-item to="/users/buy"
                clickable
                v-ripple
                :active="link === 'buy'"
                @click="link = 'buy'"
                active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon name="shopping_bag" />
              </q-item-section>
              <q-item-section>
                {{ $t(`user.myPurchase`) }}
              </q-item-section>
            </q-item>
            <q-separator  />
            <q-item to="/users/album"
                clickable
                v-ripple
                :active="link === 'album'"
                @click="link = 'album'"
                active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon name="perm_media" />
              </q-item-section>
              <q-item-section>
                {{ $t(`user.myAlbum`) }}
              </q-item-section>
            </q-item>
            <q-item to="/users/vip"
                clickable
                v-ripple
                :active="link === 'vip'"
                @click="link = 'vip'"
                active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon name="settings_brightness" />
              </q-item-section>
              <q-item-section>
                {{ $t(`user.vipSettings`) }}
              </q-item-section>
            </q-item>
            <q-item to="/users/sell"
                clickable
                v-ripple
                :active="link === 'sell'"
                @click="link = 'sell'"
                active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon name="view_headline" />
              </q-item-section>
              <q-item-section>
                {{ $t(`user.userPurchase`) }}
              </q-item-section>
            </q-item>
            <q-item to="/users/withdraw"
                clickable
                v-ripple
                :active="link === 'withdraw'"
                @click="link = 'withdraw'"
                active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon name="paid" />
              </q-item-section>
              <q-item-section>
                {{ $t(`user.myWithdrawal`) }}
              </q-item-section>
            </q-item>
            <q-separator  />
            <q-item to="/users/invite"
                clickable
                v-ripple
                :active="link === 'invite'"
                @click="link = 'invite'"
                active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon name="send" />
              </q-item-section>
              <q-item-section>
                {{ $t(`user.myInvitation`) }}
              </q-item-section>
            </q-item>
            <q-item to="/users/password"
                clickable
                v-ripple
                :active="link === 'password'"
                @click="link = 'password'"
                active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon name="password" />
              </q-item-section>

              <q-item-section>
                {{ $t(`user.resetPassword`) }}
              </q-item-section>
            </q-item>
            <q-item to="/users/buyLog"
                clickable
                v-ripple
                :active="link === 'buyLog'"
                @click="link = 'buyLog'"
                active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon name="vertical_split" />
              </q-item-section>

              <q-item-section>
                {{ $t(`user.consumptionRecord`) }}
              </q-item-section>
            </q-item>
            <q-item
                clickable
                v-ripple
                :active="link === 'service'"
                @click="link = 'service'"
                active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon name="mail_outline" />
              </q-item-section>

              <q-item-section>
                {{ $t(`user.customerService`) }}
              </q-item-section>
            </q-item>
            <q-item
                clickable
                v-ripple
                :active="link === 'drafts'"
                @click="logout"
            active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon name="exit_to_app" />
              </q-item-section>

              <q-item-section>
                {{ $t(`user.logOut`) }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar v-if="userStore.user" size="56px" class="q-mb-sm">
              <img :src="previewImage">
            </q-avatar>
            <div class="text-weight-bold">{{ userStore.user!=null ? userStore.user.nickname : '待登录' }}</div>
            <div v-if="userStore.user">
              {{userStore.user.email}}<q-icon v-if="userStore.user.isEmail==2" name="warning" style="color: red" />
            </div>
            <div v-if="userStore.user && userStore.user.isEmail==2">
             ( {{ $t(`user.emailVerification`) }})
            </div>
          </div>
        </q-img>
      </q-drawer>

      <q-page-container>
        <q-page padding>
          <NuxtPage :page-key="route => route.fullPath" />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
  <div class="row">
    <div class="col-2"> </div>
    <div class="col-auto" style="margin: 0px">
      <div class="footter" style="margin: 0px;text-align: center;">
        <router-link to="">关于图集</router-link>|
        <router-link to="">联系我们</router-link>|
        <router-link to="">帮助中心</router-link>|
        <router-link to="">提交建议</router-link>|
        <router-link to="">举报中心</router-link>|
        <router-link to="/privacyPolicy">隐私政策</router-link>|
        <router-link to="/use">使用条款</router-link>|
        <router-link to="">漏洞提交</router-link>|
      </div>
      <div class="footerText text-weight-thin"> <p>Copyright © 2002-2022 www.aiavr.uk Rights Reserved 版权所有 心世界未来科技有限公司</p></div>
      <div class="footerText text-weight-thin"><p>图片,美女,写真,图集</p></div>
      <div class="footerText text-weight-light"><p>本站所收录的作品、社区话题、用户评论、用户上传内容或图片等均属用户个人行为。如前述内容侵害您的权益，欢迎举报投诉，一经核实，立即删除，本站不承担任何责任</p></div>
      <div class="footerText text-weight-thin"><a href="https://www.51k.uk">心世界小说网</a>|<a  href="https://www.30dizhi.uk">30导航</a>|<a  href="https://www.aravrw.com">心世界</a></div>
    </div>
    <div class="col-2"></div>
  </div>

</template>

<style lang="sass">
.my-menu-link
  color: white
  background: #F2C037
</style>